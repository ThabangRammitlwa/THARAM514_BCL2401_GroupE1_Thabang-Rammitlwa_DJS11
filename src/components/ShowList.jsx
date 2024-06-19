import { useState, useEffect } from 'react';
import { fetchShowList } from '../api'


const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShowList();
        setShows(data);
      } catch (error) {
        console.error('Error fetching show list:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul>
      {shows.map(show => (
        <li key={show.id}>
          <h2>{show.title}</h2>
          <img src={show.image} alt={show.title} />
        </li>
      ))}
    </ul>
  );
};

export default ShowList;