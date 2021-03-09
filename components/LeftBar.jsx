import React from 'react';
import {
  AvatarBadge, Avatar, VStack, useDisclosure,
  useToast, Icon, Spacer, Link, Circle, Text, Box,
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
  IoCloseOutline,
} from 'react-icons/io5';
import AddStreamerModal from './AddStreamerModal';
import Triangle from './Triangle';

const Main = ({ streamersList, setStreamersList, maxNumberOfStreamers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <VStack
      h="100vh"
      bg="#3b3b44"
      pb="8px"
      pl="8px"
      pr="8px"
    >
      <AddStreamerModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        streamersList={streamersList}
        setStreamersList={setStreamersList}
      />
      <Box
        mb="16px"
      >
        <Triangle w="30" h="20" direction="bottom" color="#772ce8" />
      </Box>
      {
          streamersList.map((currentStreamer, index) => (
            <Avatar
              key={`${index}`}
              size="sm"
              name={currentStreamer.broadcaster_login}
              src={currentStreamer.thumbnail_url}
            >
              <AvatarBadge
                onClick={() => {
                  const filteredList = streamersList
                    .filter((streamer) => streamer.broadcaster_login !== currentStreamer.broadcaster_login);

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
        pt="16px"
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
      <Box mb="16px">
        <div
          className="verticalDiv"
        >
          <Text
            color="#fff"
            fontSize="xl"
          >
            STREAMDASH.GG
          </Text>
        </div>
      </Box>
      <Link href="https://www.twitch.tv/" isExternal>
        <Icon
          mb="4px"
          as={SiTwitch}
          w={6}
          h={6}
          color="#fff"
          _hover={{ color: '#772ce8' }}
        />
      </Link>
      <style jsx>
        {
        `.verticalDiv {
            writing-mode:tb-rl;
            -webkit-transform:rotate(180deg);
            -moz-transform:rotate(180deg);
            -o-transform: rotate(180deg);
            -ms-transform:rotate(180deg);
            transform: rotate(180deg);
            white-space:nowrap;
            display:block;
            bottom:0;
            width:100%;
            height:auto;
        }`
        }
      </style>
    </VStack>
  );
};

export default Main;
