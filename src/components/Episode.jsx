import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {fetchEpisode } from '../api'

const Episode = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    fetchEpisode(episodeId).then((data) => setEpisode(data))
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