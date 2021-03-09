import React from 'react';
import {
  AvatarBadge, Avatar, VStack, useDisclosure,
  useToast, Icon, Spacer, Link, Circle,
} from '@chakra-ui/react';
import {
  CgArrowsExchangeAlt,
} from 'react-icons/cg';
import {
  SiTwitch,
} from 'react-icons/si';
import {
  IoMdAdd,
} from 'react-icons/io';
import {
  IoCloseOutline, IoBulb,
} from 'react-icons/io5';
import AddStreamerModal from './AddStreamerModal';

const Main = ({ streamersList, setStreamersList, maxNumberOfStreamers }) => {
  console.log('RENDERING LEFT BAR');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <VStack
      h="100vh"
      bg="#333"
      p="8px"
    >
      <AddStreamerModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        streamersList={streamersList}
        setStreamersList={setStreamersList}
      />
      <Circle
        _hover={{ bg: '#555' }}
        borderColor="#fff"
        borderWidth="2px"
        w={8}
        h={8}
      >
        <Icon
          as={IoBulb}
          color="#fff"
        />
      </Circle>
      {
          streamersList.map((currentStreamer, index) => (
            <Avatar
              key={index}
              size="sm"
              name={currentStreamer.display_name}
              src={currentStreamer.thumbnail_url}
            >
              <AvatarBadge
                onClick={() => {
                  const filteredList = streamersList
                    .filter((streamer) => streamer.display_name !== currentStreamer.display_name);

                  console.log(filteredList);

                  setStreamersList([...filteredList]);
                }}
                borderColor="#777"
                bg="#777"
                color="#fff"
                boxSize="1em"
              >
                <Icon
                  as={IoCloseOutline}
                />
              </AvatarBadge>
            </Avatar>
          ))
      }
      <VStack
        pt="24px"
      >
        <Circle
          _hover={{ bg: '#555' }}
          borderColor="#fff"
          borderWidth="2px"
          w={8}
          h={8}
        >
          <Icon
            onClick={() => {
              if (maxNumberOfStreamers === streamersList.length) {
                toast({
                  title: `The maximum number of concurrent streams is ${maxNumberOfStreamers}`,
                  description: 'Please delete one from the left column before adding a new one.',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                onOpen();
              }
            }}
            as={IoMdAdd}
            color="#fff"
          />
        </Circle>
        <Circle
          _hover={{ bg: '#555' }}
          borderColor="#fff"
          borderWidth="2px"
          w={8}
          h={8}
        >
          <Icon
            as={CgArrowsExchangeAlt}
            color="#fff"
            onClick={() => {
              const wrappers = document.getElementsByClassName('iframe-wrapper');

              for (const wrapper of wrappers) {
                const nextOrder = parseInt(wrapper.style.order) + 1;
                if (nextOrder >= streamersList.length) {
                  nextOrder = 0;
                }

                wrapper.style.order = `${nextOrder}`;
              }
            }}
          />
        </Circle>
      </VStack>
      <Spacer />
      <Link href="https://www.twitch.tv/" isExternal>
        <Icon
          mb="4px"
          as={SiTwitch}
          w={6}
          h={6}
          color="#fff"
          _hover={{ color: '#f0f' }}
        />
      </Link>
    </VStack>
  );
};

export default Main;
