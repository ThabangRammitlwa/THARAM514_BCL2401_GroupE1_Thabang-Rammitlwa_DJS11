import { useEffect, useState } from 'react';
import { server } from '../main';
import axios from 'axios';
import { Box, Image, Text, Container, SimpleGrid, Button, VStack, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,Tag, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { FaPlay, FaSortAlphaDown, FaSortAlphaUp,FaStop } from "react-icons/fa";
import Loader from './Loader';
import Error from './Error';
import PropTypes from 'prop-types';
import Favourite from './Favourites';

const API_BASE_URL = 'https://podcast-api.netlify.app';

const genres = [
  { id: 1, title: 'Personal Growth' },
  { id: 2, title: 'Investigative Journalism' },
  { id: 3, title: 'History' },
  { id: 4, title: 'Comedy' },
  { id: 5, title: 'Entertainment' },
  { id: 6, title: 'Business' },
  { id: 7, title: 'Fiction' },
  { id: 8, title: 'News' },
  { id: 9, title: 'Kids and Family' }
];

const Genre = ({ onSelectGenre, selectedGenre }) => {
  return (
    <HStack spacing={4} wrap="wrap" justify="center">
      <Button 
        onClick={() => onSelectGenre(null)}
        colorScheme="purple"
        variant={selectedGenre === null ? "solid" : "outline"}
      >
        All Genres
      </Button>
      {genres.map((genre) => (
        <Button 
          key={genre.id} 
          onClick={() => onSelectGenre(genre.id)}
          colorScheme="purple"
          variant={genre.id === selectedGenre ? "solid" : "outline"}
        >
          {genre.title}
        </Button>
      ))}
    </HStack>
  );
};

Genre.propTypes = {
  onSelectGenre: PropTypes.func.isRequired,
  selectedGenre: PropTypes.number,
};

const Podcast = () => {
  const [podcastData, setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [favourites, setFavourites] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const itemsPerPage = 12;

  const isFavourite = (podcastId) => {
    return favourites[podcastId] !== undefined;
  };
  const handleLikeButtonClick = (podcast) => {
    setFavourites(prevFavourites => {
      const newFavourites = { ...prevFavourites };
      if (newFavourites[podcast.id]) {
        delete newFavourites[podcast.id];
      } else {
        newFavourites[podcast.id] = podcast;
      }
      return newFavourites;
    });
  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}`);
        const podcastsWithGenres = data.map(podcast => ({
          ...podcast,
          genreId: Math.floor(Math.random() * 9) + 1,
          seasonsCount: Math.floor(Math.random() * 10) + 1
        }));
        const sortedData = podcastsWithGenres.sort((a, b) => a.title.localeCompare(b.title));
        setPodcastData(sortedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
     
      fetchData();
    }, []);

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    const sortedData = [...podcastData].sort((a, b) =>
      newOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setPodcastData(sortedData);
  };

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePodcastClick = async (podcast) => {
    setSelectedPodcast(podcast);
    setLoadingDetails(true);
    onOpen();

    try {
      const { data } = await axios.get(`${API_BASE_URL}/id/${podcast.id}`);
      setSelectedPodcast(data);
    } catch (error) {
      console.error('Error fetching podcast details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
  };

  const playAudio = (audioUrl) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(audioUrl);
    audio.play().catch(e => {
      console.error("Audio play failed:", e);
    });
    setCurrentAudio(audio);
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
  };
  const handleModalClose = () => {
    onClose();
    stopAudio();
  };

  
  const filteredPodcasts = selectedGenre
    ? podcastData.filter(podcast => podcast.genreId === selectedGenre)
    : podcastData;

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = filteredPodcasts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredPodcasts.length / itemsPerPage);

  if (error) return <Error message={"Error While Fetching data From API "} />;

  return (
    <Container maxW={'container.xl'} py={8}>
      {loading ? (
        <Loader />
      ) : (
        <VStack spacing={8}>
          <Genre onSelectGenre={handleGenreSelect} selectedGenre={selectedGenre} />
          <Button 
            onClick={toggleSortOrder} 
            mb={4} 
            leftIcon={sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          >
            Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
          </Button>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
            {currentItems.map((podcast, index) => (
              <VStack key={index} align="stretch" spacing={2}>
                <Box position="relative" overflow="hidden" borderRadius="lg" cursor="pointer" onClick={() => handlePodcastClick(podcast)}>
                  <Image 
                    src={podcast.image} 
                    alt={podcast.title} 
                    w="100%" 
                    h="250px" 
                    objectFit="cover" 
                    transition="transform 0.3s"
                    _hover={{ transform: 'scale(1.05)' }}
                  />
                  <Box 
                    position="absolute" 
                    bottom="0" 
                    left="0" 
                    right="0" 
                    bg="rgba(0,0,0,0.7)" 
                    p={2}
                  >
                    <Text color="white" fontWeight="bold" fontSize="sm" noOfLines={1}>
                      {podcast.title}
                    </Text>
                    <Text color="gray.300" fontSize="xs">
                      {podcast.duration} • {podcast.seasonsCount} season{podcast.seasonsCount !== 1 ? 's' : ''}
                    </Text>
                  </Box>
                </Box>
               
                <Tag size="sm" colorScheme="purple">
                  {genres.find(g => g.id === podcast.genreId)?.title || 'Unknown Genre'}
                </Tag>
              </VStack>
            ))}
          </SimpleGrid>
          <SimpleGrid columns={5} spacing={2} w="full" justifyContent="center">
            {[...Array(totalPages).keys()].map((pageIndex) => (
              <Button
                key={pageIndex}
                size="sm"
                variant={pageIndex + 1 === page ? 'solid' : 'outline'}
                colorScheme="purple"
                onClick={() => changePage(pageIndex + 1)}
              >
                {pageIndex + 1}
              </Button>
            ))}
          </SimpleGrid>
        </VStack>
      )}

<Modal isOpen={isOpen} onClose={onClose} size="xl">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{selectedPodcast?.title}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Image src={selectedPodcast?.image} alt={selectedPodcast?.title} mb={4} />
      <Text>{selectedPodcast?.description}</Text>
      {loadingDetails ? (
        <Loader />
      ) : (
        <Accordion allowMultiple>
          {selectedPodcast?.seasons.map((season, seasonIndex) => (
            <AccordionItem key={seasonIndex}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Season {season.season}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {season.episodes.map((episode, episodeIndex) => (
                  <Box key={episodeIndex} mb={2}>
                    <Text fontWeight="bold">{episode.title}</Text>
                    <Text fontSize="sm">{episode.description}</Text>
                    <Text fontSize="xs">Duration: {episode.duration}</Text>
                    <Button 
                      size="sm" 
                      leftIcon={<FaPlay />} 
                      onClick={() => playAudio(episode.file)}
                      mt={2}
                    >
                      Play Episode
                    </Button>
                    <HStack spacing={2} justify="space-between">
                    <Button 
                        size="sm" 
                        mt="3"
                      leftIcon={<FaStop />} 
                      onClick={() => stopAudio(episode.file)}
                    >
                      Stop Episode
                      </Button>
                      <Favourite
                    podcast={selectedPodcast}
                    initialIsFavourite={isFavourite(selectedPodcast.id)}
                    onToggleFavourite={handleLikeButtonClick}
                      />
                      </HStack>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="purple" mr={3} onClick={handleModalClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
      </Modal>
    </Container>
  );
};

export default Podcast;