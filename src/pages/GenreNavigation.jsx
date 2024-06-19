
import { Link } from 'react-router-dom';

const genres = [
    { id: 1, name: 'Personal Growth' },
    { id: 2, name: 'Investigative Journalism' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Entertainment' },
    { id: 6, name: 'Business' },
    { id: 7, name: 'Fiction' },
    { id: 8, name: 'News' },
     { id: 9, name: 'Kids and Family' },
];

const GenreNavigation = () => {
  return (
    <ul>
      {genres.map(genre => (
        <li key={genre.id}>
          <Link to={`/genre/${genre.name}`}>{genre.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default GenreNavigation;