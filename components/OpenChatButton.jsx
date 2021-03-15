import React from 'react';
import {
  Circle, Icon,
} from '@chakra-ui/react';
import {
  IoChatbubblesOutline,
} from 'react-icons/io5';

const Main = ({ setChatState }) => (
  <Circle
    bg="#333"
    _hover={{
      transform: 'translate(8%, -2%)',
      'box-shadow': '-1px 1px  #9147ff, -2px 2px  #9147ff, -3px 3px  #9147ff, -4px 4px  #9147ff',
    }}
    style={{
      transition: '0.2s ease',
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
);

export default Main;
