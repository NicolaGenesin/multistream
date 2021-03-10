import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import {
  AvatarBadge, Avatar, VStack, useDisclosure,
  useToast, Icon, Spacer, Link, Circle, Text, Box,
} from '@chakra-ui/react';
import {
  SiTwitch,
} from 'react-icons/si';
import {
  IoMdAdd,
} from 'react-icons/io';
import {
  IoCloseOutline,
} from 'react-icons/io5';
import {
  MdRotateRight,
} from 'react-icons/md';
import AddStreamerModal from './AddStreamerModal';
import Triangle from './Triangle';

const Main = forwardRef(({
  streamersList,
  setStreamersList,
  maxNumberOfStreamers,
  selectedLayout,
}, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // this is ugly but prevents iframes from refreshing
  useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
  }));

  return (
    <VStack
      h="100vh"
      bg="#333"
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
        <Triangle
          w="30"
          h="20"
          direction="bottom"
          color="#9147ff"
        />
      </Box>
      {
          streamersList.map((currentStreamer, index) => (
            <Avatar
              borderColor="#fff"
              borderWidth="0px"
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
        pt={streamersList.length ? '16px' : '0px'}
      >
        <Circle
          _hover={{ bg: '#555' }}
          borderColor="#fff"
          borderWidth="2px"
          w={8}
          h={8}
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
        >
          <Icon
            as={IoMdAdd}
            color="#fff"
          />
        </Circle>
        {streamersList.length > 1 && (
        <Circle
          _hover={{ bg: '#555' }}
          borderColor="#fff"
          borderWidth="2px"
          w={8}
          h={8}
          onClick={() => {
            const wrappers = document.getElementsByClassName('iframe-wrapper');

            for (const wrapper of wrappers) {
              const nextOrder = parseInt(wrapper.style.order) + 1;
              if (nextOrder >= streamersList.length) {
                nextOrder = 0;
              }

              wrapper.style.order = `${nextOrder}`;
              wrapper.style.flex = `${selectedLayout.values[nextOrder]}`;
              wrapper.style.height = nextOrder === 0
                ? `${selectedLayout.heightPercentagePerRow[0]}`
                : `${selectedLayout.heightPercentagePerRow[1]}`;
            }
          }}
        >
          <Icon
            as={MdRotateRight}
            color="#fff"
          />
        </Circle>
        )}
      </VStack>
      <Spacer />
      <Box mb="16px">
        <div
          className="verticalDiv"
        >
          <Text
            color="#fff"
            fontSize="lg"
            fontWeight="semibold"
            letterSpacing="wide"
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
          _hover={{ color: '#9147ff' }}
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
});

export default Main;
