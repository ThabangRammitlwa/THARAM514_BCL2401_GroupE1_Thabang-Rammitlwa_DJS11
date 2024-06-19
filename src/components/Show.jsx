import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { fetchShow } from '../api';


const Show = () => {
    const { id } = useParams();
    const [show, setShow] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShow(id); 
        setShow(data);
      } catch (error) {
        console.error('Error fetching show:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h1>{show.title}</h1>
      <ul>
        {show.seasons && show.seasons.map(season => (
          <li key={season.id}>
            <h2>{season.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Show