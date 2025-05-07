'use client'

import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaClosedCaptioning, FaCog, FaExpand } from 'react-icons/fa'

import './player.css'
import { MovieType } from '@/types/movies';

export default function VideoPlayer(data: MovieType) {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [duration, setDuration] = useState<string>('0:00');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = () => {
    const container = document.querySelector('.video-wrapper') as HTMLElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setFullScreen(true)).catch(() => { });
    } else {
      document.exitFullscreen().then(() => setFullScreen(false)).catch(() => { });
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

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', setVideoDuration);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', setVideoDuration);
    };
  }, []);

  return (
    <div className={`video-wrapper relative`}>
      <div className={fullScreen ? "video-container" : " "}>
        <video ref={videoRef} id="moviePlayer" className="w-screen">
          <source src={`${process.env.NEXT_PUBLIC_BASE_URL}/movies/watch/${data._id}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="controls-container absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <div
          className="progress-bar mb-2 h-1 bg-gray-700 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * (videoRef.current?.duration || 0);
            if (videoRef.current) {
              videoRef.current.currentTime = newTime;
            }
          }}
        >
          <div className="progress-bar-fill bg-purple-500 h-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between items-center">
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
              <FaExpand className="text-xl" />
            </button>
          </div>
        </div>
      </div >
    </div >
  );
}

