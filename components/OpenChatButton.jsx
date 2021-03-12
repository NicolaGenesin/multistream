import React from 'react';
import {
  Box, Circle, Icon,
} from '@chakra-ui/react';
import {
  IoChatbubblesOutline,
} from 'react-icons/io5';

const Main = ({ setChatState }) => (
  <Box
    h="auto"
    w="auto"
    position="fixed"
    bottom="0"
    right="0"
    m="8px 8px"
  >
    <Circle
      boxShadow="dark-lg"
      bg="#333"
      _hover={{
        color: '#ffa502',
        transform: 'scale(1.05)',
        'box-shadow': '0 0 8px #888',
      }}
      borderColor="#9147ff"
      borderWidth="2px"
      w={10}
      h={10}
      onClick={() => {
        setChatState(true);
      }}
    >
      <Icon
        w={5}
        h={5}
        as={IoChatbubblesOutline}
        color="#fff"
      />
    </Circle>
  </Box>
);

export default Main;
