import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const GenreList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
`;

const GenreItem = styled.li`
  margin-right: 1rem;
`;

const GenreLink = styled(Link)`
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const GenreNavigation = () => {
  return (
    <GenreList>
      {genres.map(genre => (
        <GenreItem key={genre.id}>
          <GenreLink to={`/genre/${genre.name}`}>{genre.name}</GenreLink>
        </GenreItem>
      ))}
    </GenreList>
  );
};

export default GenreNavigation;