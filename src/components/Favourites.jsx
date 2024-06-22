import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { BiHeart } from 'react-icons/bi';
import PropTypes from 'prop-types';

const Favourite = ({ podcast, initialIsFavourite, onToggleFavourite }) => {
  const [isFav, setIsFav] = useState(initialIsFavourite);

  useEffect(() => {
    setIsFav(initialIsFavourite);
  }, [initialIsFavourite]);

  const handleToggleFavourite = () => {
    const newFavStatus = !isFav;
    setIsFav(newFavStatus);
    
    if (newFavStatus) {
      addFavourite(podcast);
    } else {
      removeFavourite(podcast.id);
    }

    onToggleFavourite(podcast);
  };

  const addFavourite = (podcast) => {
    const now = new Date().getTime();
    const favourite = { ...podcast, timestamp: now };
    localStorage.setItem(`favourite-${podcast.id}`, JSON.stringify(favourite));
  };

  const removeFavourite = (podcastId) => {
    localStorage.removeItem(`favourite-${podcastId}`);
  };

  return (
    <Button
      size="sm"
      color={isFav ? 'purple.400' : 'gray.500'}
      rightIcon={<BiHeart />}
      onClick={handleToggleFavourite}
    >
      {isFav ? 'Unlike' : 'Like'}
    </Button>
  );
};

Favourite.propTypes = {
  podcast: PropTypes.object.isRequired,
  initialIsFavourite: PropTypes.bool.isRequired,
  onToggleFavourite: PropTypes.func.isRequired,
};

export default Favourite;
