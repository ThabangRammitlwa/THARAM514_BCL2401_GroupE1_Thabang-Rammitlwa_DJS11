import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Episode = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      const response = await fetch(`https://podcast-api.netlify.app/id/${episodeId}`);
      const data = await response.json();
      setEpisode(data);
    };

    fetchEpisode();
  }, [episodeId]);

  return (
    <div>
      {episode ? (
        <div>
          <h2>{episode.title}</h2>
          <audio src={episode.file} controls />
          {}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Episode;