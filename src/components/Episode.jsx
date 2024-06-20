import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEpisode } from '../api'
import AudioPlayer from './AudioPlayer';

const Episode = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEpisode(episodeId);
        setEpisode(data);
      } catch (error) {
        console.error('Error fetching episode:', error);
      }
    };

    fetchData();
  }, [episodeId]);

  return (
    <div>
      {episode ? (
        <div>
          <h2>{episode.title}</h2>
          <AudioPlayer audio src={episode.file} controls />
          {}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Episode;