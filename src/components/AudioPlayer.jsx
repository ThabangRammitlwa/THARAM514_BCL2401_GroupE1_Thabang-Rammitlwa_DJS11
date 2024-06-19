import { useState, useEffect } from 'react';
import { fetchAudioPlayer } from '../api';

const AudioPlayer = (audioSrc ) => {
  const [audioData, setAudioData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchAudioPlayer(audioSrc);
        setAudioData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [audioSrc]);

  if (loading) {
    return <p>Loading audio...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {audioData && (
        <audio src={audioData.url} controls />
      )}
    </div>
  );
};

export default AudioPlayer;