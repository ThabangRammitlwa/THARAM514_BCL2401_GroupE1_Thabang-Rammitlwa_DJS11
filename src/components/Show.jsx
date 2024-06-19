import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getShow } from '../api/show';

const Show = () => {
    const { id } = useParams();
    const [show, setShow] = useState({});

  useEffect(() => {
    getShow(id).then(data => setShow(data));
  }, [id]);

  return (
    <div>
      <h1>{show.title}</h1>
      <ul>
        {show.seasons.map(season => (
          <li key={season.id}>
            <h2>{season.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Show