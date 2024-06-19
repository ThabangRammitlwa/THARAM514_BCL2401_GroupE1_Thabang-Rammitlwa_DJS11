import { useState, useEffect } from 'react';
import { getAudioSrc } from './api';

const AudioPlayerComponent = () => {
  const [audioSrc, setAudioSrc] = useState('');

  useEffect(() => {
    getAudioSrc().then(src => setAudioSrc(src));
  }, []);

  return (
    <div>
      {audioSrc && (
        <audio src={audioSrc} controls />
      )}
    </div>
  );
};

export default AudioPlayerComponent;