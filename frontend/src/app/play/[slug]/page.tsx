"use client";
import { useParams } from "next/navigation";
import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayer() {
  const params = useParams();
  const slug = params.slug;
  console.log(slug);
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  console.log(
    `${process.env.NEXT_PUBLIC_BASE_URL}/68190bea44a165ec736576dd/index.m3u8`,
  );

  React.useEffect(() => {
    if (!playerRef.current) {
      requestAnimationFrame(() => {
        if (videoRef.current) {
          const options = {
            autoplay: false,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [
              {
                src: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/index.m3u8`,
                type: "application/x-mpegURL",
              },
            ],
          };

          playerRef.current = videojs(videoRef.current, options);
          console.log("Player initialized");

          const player = playerRef.current;
          player.on("ready", () => {
            console.log("Player is ready");
          });

          player.on("error", (e) => {
            console.error("Player error:", e, player.error());
          });
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [slug]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div>Rest of app here</div>

      <div style={{ margin: "20px 0", border: "1px solid #ccc" }}>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          controls
          preload="auto"
          width="640"
          height="360"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div>Rest of app here</div>
    </div>
  );
}

export default VideoPlayer;
