import React, { useRef, useEffect } from 'react';
import '../css/Option01Component.css';

const Option02Component = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      const video = videoRef.current;
      try {
        // 设置视频路径
        video.src = process.env.PUBLIC_URL + '/asset/2.mp4';

        // 加载视频元数据
        await video.load();

        // 监听视频结束事件
        video.addEventListener('ended', () => {
          video.currentTime = 0;
          video.play();
        });

        // 播放视频
        video.play();
      } catch (error) {
        console.error('Error loading or playing the video:', error);
      }
    };

    playVideo();
  }, []); // 空数组确保useEffect只运行一次，即在组件挂载后

  return (
    <div className="video-container">
      <video ref={videoRef} className="video" controls={false} />
    </div>
  );
};

export default Option02Component;
