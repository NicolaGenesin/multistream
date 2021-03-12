import React from 'react';
import {
  Box, Center, Button, VStack, Heading,
} from '@chakra-ui/react';
import TrendingStreamers from './TrendingStreamers';

const Main = ({
  action,
  setStreamersList,
}) => (
  <Center
    w="100%"
    h="100%"
    pt="5%"
    color="white"
  >
    <VStack>
      <Heading
        mt="16px"
        mb={['0px', '16px']}
        textAlign="center"
        p="16px"
        fontSize={['lg', '4xl']}
      >
        Watch multiple Twitch streams on your screen
      </Heading>
      <Box mb={['0px', '48px']}>
        <Button
          boxShadow="dark-lg"
          letterSpacing="wide"
          size="lg"
          w="100%"
          color="#9147ff"
          onClick={() => {
            action();
          }}
        >
          Add Streamer
        </Button>
      </Box>
      <TrendingStreamers
        setStreamersList={setStreamersList}
      />
    </VStack>
  </Center>
);

export default Main;
