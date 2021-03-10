import React, { useState } from 'react';
import {
  Box, Input, Button, Text, HStack, Spacer, Textarea,
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
    boxShadow="md"
    borderRadius="sm"
    bg="#fff"
    m="10px 15px"
  >
    <Button
      color="#9147ff"
      size="sm"
      leftIcon={<IoChatbubblesOutline />}
      onClick={() => {
        setChatState(true);
      }}
    >
      See Twitch Chat
    </Button>
  </Box>
);

export default Main;
