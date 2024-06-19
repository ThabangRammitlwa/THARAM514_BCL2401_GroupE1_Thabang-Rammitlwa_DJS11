import { useState, useEffect } from 'react';
import { AudioSrc } from '../api';

const AudioPlayer = () => { 
  const [audioSrc, setAudioSrc] = useState('');

  useEffect(() => {
    AudioSrc().then(src => setAudioSrc(src));
  }, []);

  return (
    <div>
      {audioSrc && (
        <audio src={audioSrc} controls />
      )}
    </div>
  );
};

export default AudioPlayer;