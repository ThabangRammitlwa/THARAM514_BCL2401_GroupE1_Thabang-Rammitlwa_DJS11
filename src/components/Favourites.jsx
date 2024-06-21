import { Container, Heading, Text } from '@chakra-ui/react';

const Favorites = () => {
  return (
    <Container maxW={'container.xl'} py={8}>
      <Heading mb={4}>Your Favorites</Heading>
      <Text>Your favorite podcasts will appear here.</Text>
    </Container>
  );
};

export default Favorites;