import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'


const Show = () => {
    const { id } = useParams();
    const [show, setShow] = useState({});

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`/api/shows/${id}`); 
        setShow(response.data);
      } catch (error) {
        console.error('Error fetching show:', error);
      }
    };

    fetchShow();
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