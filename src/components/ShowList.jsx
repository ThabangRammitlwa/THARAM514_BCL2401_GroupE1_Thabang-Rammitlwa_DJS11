import { useState, useEffect } from 'react';
import { getShows } from '../api/shows';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    getShows().then(data => setShows(data));
  }, []);

  return (
    <ul>
      {shows.map(show => (
        <li key={show.id}>
          <h2>{show.title}</h2>
        </li>
      ))}
    </ul>
  );
};

export default ShowList