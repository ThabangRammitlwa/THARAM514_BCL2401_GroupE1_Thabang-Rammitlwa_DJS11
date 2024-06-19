import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Genre = () => {
  const { genreId } = useParams();
  const [genre, setGenre] = useState(null);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchGenre = async () => {
      const response = await fetch(`https://api.example.com/genres/${genreId}`);
      const data = await response.json();
      setGenre(data.genre);
      setShows(data.shows);
    };

    fetchGenre();
  }, [genreId]);

  return (
    <div>
      {genre ? (
        <div>
          <h2>{genre.title}</h2>
          <p>{genre.description}</p>
          <h3>Shows in this genre:</h3>
          <ul>
            {shows.map((show) => (
              <li key={show.id}>
                <h4>{show.title}</h4>
                <p>{show.description}</p>
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