import React from 'react';

import {
  Box, Center, Button, VStack, Heading,
} from '@chakra-ui/react';

const Main = ({ action }) => (
  <Center
    w="100%"
    h="100%"
    color="white"
  >
    <VStack>
      <Heading
        mb="16px"
        textAlign="center"
        p="16px"
      >
        Watch multiple Twitch streams on the same page.
      </Heading>
      <Box>
        <Button
          size="lg"
          w="100%"
          color="#772ce8"
          onClick={() => {
            action();
          }}
        >
          Add Streamer
        </Button>
      </Box>
    </VStack>
  </Center>
);

export default Main;
