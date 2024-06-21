
import { Box, Image, Text } from '@chakra-ui/react';
import ThabangPodcast from '../assets/ThabangPodcastbgTP.png';
import { motion } from "framer-motion"



const Home = () => {
  return <Box
  bgColor={'blue.700'}
  w={'full'} h={'85vh'}>
  <motion.div style={{
    height:"80vh",
  }}
  animate={{
    translateY:"20px",
  }}
  transition={{
    duration:2,
    repeat:Infinity,
    repeatType:"reverse"
  }}
  >
    
    <Image
      w={'full'}
      h={'full'}
      objectFit={'contain'}
      src={ThabangPodcast}
      filter={'grayscale(1)'}
    />


  </motion.div>
  <Text
    fontSize={'5xl'}
    textAlign={'center'}
    fontWeight={'thin'}
    color={"white.200"}
    mt={'-10'}
  > Podcast you enjoy the Most ! </Text>
</Box>
}

export default Home