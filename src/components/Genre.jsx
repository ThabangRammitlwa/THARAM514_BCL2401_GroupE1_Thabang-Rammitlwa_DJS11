import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGenre } from '../api';

const Genre = () => {
  const {id: genreId } = useParams();
  const [genre, setGenre] = useState(null);
 

    useEffect(() => {
        fetchGenre(genreId).then((data) => setGenre(data));
    },[genreId])
  return (
    <div>
      {genre ? (
        <div>
          <h2>{genre.title}</h2>
          <p>{genre.description}</p>
          <h3>Shows in this genre:</h3>
          <ul>
          {genre.showIds.map((showId) => (
              <li key={showId}>
             Show {showId}
                  </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Genre;