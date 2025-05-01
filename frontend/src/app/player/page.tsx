"use client";
import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayer() {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const options = {
        autoplay: false, // Changed to false for testing
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            // Test with a public HLS stream
            src: "http://localhost:5000/videos/output.m3u8",
            type: "application/x-mpegURL",
          },
        ],
      };

      // Initialize player
      try {
        playerRef.current = videojs(videoRef.current, options);
        console.log("Player initialized");

        const player = playerRef.current;
        player.on("ready", () => {
          console.log("Player is ready");
        });

        player.on("error", (e) => {
          console.error("Player error:", e, player.error());
        });
      } catch (error) {
        console.error("Error initializing player:", error);
      }
    }

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

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
