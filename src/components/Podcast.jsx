import { useEffect, useState } from 'react';
import { server } from '../main';
import axios from 'axios';
import { Box, Image, Text, Container, SimpleGrid, Button, VStack, HStack,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure} from '@chakra-ui/react';
import { BiHeart } from 'react-icons/bi';
import { FaPlay, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import Loader from './Loader';
import Error from './Error';

const Podcast = () => {
  const [podcastData, setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const itemsPerPage = 12; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}`);
        const sortedData=data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcastData(sortedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
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

  const handlePodcastClick = (podcast) => {
    setSelectedPodcast(podcast);
    onOpen();
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = podcastData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(podcastData.length / itemsPerPage);

  if (error) return <Error message={"Error While Fetching data From API "} />;

  return (
    <Container maxW={'container.xl'} py={8}>
      {loading ? (
        <Loader />
      ) : (
          <VStack spacing={8}>
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
              <Box key={index} position="relative" overflow="hidden" borderRadius="lg" cursor="pointer"    onClick={() => handlePodcastClick(podcast)}>
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
                    {podcast.duration}
                  </Text>
                </Box>
                </Box >
                <HStack spacing={2} justify="space-between">
                  <Button size="sm" variant='ghost'w='50%' leftIcon={<FaPlay />}flex={1}>
                    Play
                  </Button>
                  <Button size="sm" color='purple.400'w='50%' rightIcon={<BiHeart />}flex={1}>
                    Like
                    </Button>
                    </HStack>
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

<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedPodcast?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={selectedPodcast?.image} alt={selectedPodcast?.title} mb={4} />
            <Text>{selectedPodcast?.description}</Text>
            <Text mt={2}>Duration: {selectedPodcast?.duration}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">View</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Podcast;