import { useState, useEffect } from 'react';
import { fetchShowList } from '../api'


const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShowList();
        const sortedShows = data.sort((a, b) => a.title.localCompare(b.title));
        setShows(sortedShows);
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
          <span>{show.genre}</span>
          <img src={show.image} alt={show.title} />
        </li>
      ))}
    </ul>
  );
};

export default ShowList;