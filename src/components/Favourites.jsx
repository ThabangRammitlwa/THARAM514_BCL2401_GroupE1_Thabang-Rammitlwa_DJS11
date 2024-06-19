import { useState, useEffect } from 'react';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [favouritesResponse, podcastsResponse] = await Promise.all([
          fetch('/api/favourites'),
          fetch('/api/podcasts'),
        ]);

        const favouritesData = await favouritesResponse.json();
        const podcastsData = await podcastsResponse.json();

        setFavourites(favouritesData);
        setPodcasts(podcastsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToFavourites = (podcast) => {
    setFavourites([...favourites, podcast]);
  };

  const removeFromFavourites = (podcastId) => {
    setFavourites(favourites.filter((podcast) => podcast.id !== podcastId));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Favourites</h2>
      <ul>
        {favourites.map((favourite) => (
          <li key={favourite.id}>
            <span>{favourite.title}</span>
            <button onClick={() => removeFromFavourites(favourite.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h2>Podcasts</h2>
      <ul>
        {podcasts.map((podcast) => (
          <li key={podcast.id}>
            <span>{podcast.title}</span>
            <button onClick={() => addToFavourites(podcast)}>
              Add to Favourites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;