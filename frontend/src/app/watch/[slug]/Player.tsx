'use client'

import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaClosedCaptioning, FaCog, FaExpand, FaCompress } from 'react-icons/fa'

import './player.css'
import { MovieType } from '@/types/movies';

export default function VideoPlayer(data: MovieType) {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [duration, setDuration] = useState<string>('0:00');
  const [showControls, setShowControls] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');

    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds}`
      : `${minutes}:${seconds}`;
  };
  const resetControlsTimer = () => {
    setShowControls(true);
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      resetControlsTimer();
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleFullscreen = () => {
    const element = wrapperRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen().then(() => {
        setFullScreen(true);
        resetControlsTimer();
      });
    } else {
      document.exitFullscreen().then(() => {
        setFullScreen(false);
        setShowControls(true);
      });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTime(formatTime(video.currentTime));
    };

    const setVideoDuration = () => {
      setDuration(formatTime(video.duration));
    };

    const handleFullscreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
      if (document.fullscreenElement) {
        resetControlsTimer();
      } else {
        setShowControls(true);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', setVideoDuration);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    wrapperRef.current?.addEventListener('mousemove', resetControlsTimer);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', setVideoDuration);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      wrapperRef.current?.removeEventListener('mousemove', resetControlsTimer);
      clearTimeout(timeoutRef.current!);
    };
  }, [isPlaying]);

  return (
    <div
      className="video-wrapper relative w-full h-full bg-black"
      ref={wrapperRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        if (!fullScreen) setShowControls(true);
        else resetControlsTimer();
      }}
    >

      <div className={`video-container ${fullScreen ? 'fixed inset-0 flex items-center justify-center' : ''}`}>
        <video
          ref={videoRef}
          id="moviePlayer"
          className={`${fullScreen ? 'max-h-full max-w-full' : 'max-h-[80vh]'}`}
          onClick={handlePlayPause}
        >
          <source src={`${process.env.NEXT_PUBLIC_BASE_URL}/movies/watch/${data._id}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={`controls-container absolute bottom-0 left-0 right-0 z-50 transition-opacity duration-300 ${fullScreen ? 'bg-gradient-to-t from-black/80 to-transparent' : 'bg-gradient-to-t from-black/70 to-transparent'} ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className="progress-bar mb-4"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * (videoRef.current?.duration || 0);
            if (videoRef.current) {
              videoRef.current.currentTime = newTime;
            }
            resetControlsTimer();
          }}
        >
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between items-center px-4 pb-3">
          <div className="flex space-x-4 items-center">
            <button onClick={handlePlayPause} className="text-white hover:text-purple-300 transition">
              {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
            </button>
            <div className="flex items-center text-sm text-white">
              <span>{currentTime}</span>
              <span className="mx-1">/</span>
              <span>{duration}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="text-white hover:text-purple-300 transition">
              <FaClosedCaptioning className="text-xl" />
            </button>
            <button className="text-white hover:text-purple-300 transition">
              <FaCog className="text-xl" />
            </button>
            <button onClick={handleFullscreen} className="text-white hover:text-purple-300 transition">
              {fullScreen ? <FaCompress className="text-xl" /> : <FaExpand className="text-xl" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

