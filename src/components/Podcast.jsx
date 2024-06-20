import  { useEffect, useState } from 'react';
import { server } from '../main';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Box, Image, Text, Container, VStack, Button, HStack } from '@chakra-ui/react';
import { BiHeart } from 'react-icons/bi';
import Loader from './Loader';
import Error from './Error';

const Podcast = () => {
  const [podcastData, setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}`);
        setPodcastData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = podcastData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(podcastData.length / itemsPerPage);

  if (error) return <Error message={"Error While Fetching data From API "} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <VStack w={'120'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'}>
            {currentItems.map((podcast, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" p="6" boxShadow="md">
                <Card>
                  <CardHeader>
                    <Image src={podcast.image} alt={podcast.title} />
                  </CardHeader>
                  <CardBody>
                    <Text fontWeight="bold">{podcast.title}</Text>
                    <Text>{podcast.description}</Text>
                  </CardBody>
                  <CardFooter>
                    <Text>Duration: {podcast.duration}</Text>
                  </CardFooter>
                  <CardFooter>
                    <Button flex='1' variant='ghost' leftIcon={<BiHeart />}>
                      Like
                    </Button>
                  </CardFooter>
                </Card>
              </Box>
            ))}
          </VStack>
          <HStack w={'full'} overflow={'auto'} p={'8'}>
            {[...Array(totalPages).keys()].map((pageIndex) => (
              <Button
                key={pageIndex}
                bgColor={pageIndex + 1 === page ? 'blackAlpha.900' : 'gray.300'}
                color={pageIndex + 1 === page ? 'white' : 'black'}
                onClick={() => changePage(pageIndex + 1)}
              >
                {pageIndex + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Podcast;