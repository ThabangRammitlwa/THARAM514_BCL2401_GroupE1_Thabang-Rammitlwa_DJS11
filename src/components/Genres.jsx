
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, SimpleGrid, Button, Heading } from '@chakra-ui/react';

const GenresPage = () => {
  const genres = [
    { id: 1, name: 'Genre 1' },
    { id: 2, name: 'Genre 2' },
    { id: 3, name: 'Genre 3' },
    { id: 4, name: 'Genre 4' },
    { id: 5, name: 'Genre 5' },
    { id: 6, name: 'Genre 6' },
    { id: 7, name: 'Genre 7' },
    { id: 8, name: 'Genre 8' },
    { id: 9, name: 'Genre 9' },
  ];

  return (
    <Container maxW={'container.xl'} py={8}>
      <Heading as="h1" size="xl" mb={4}>Genres</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {genres.map(genre => (
          <Box key={genre.id} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
            <Heading as="h2" size="md" mb={2}>{genre.name}</Heading>
            <Button
              as={RouterLink}
              to={`/genres/${genre.id}`} // Under Construction 
              colorScheme="purple"
              w="100%"
            >
              View Podcasts
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default GenresPage;