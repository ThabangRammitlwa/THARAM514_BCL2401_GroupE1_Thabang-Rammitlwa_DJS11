import { useState, useEffect } from 'react';
import { Shows } from '../api';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    Shows().then(data => setShows(data));
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