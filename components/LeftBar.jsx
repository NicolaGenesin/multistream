import React, {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import {
  AvatarBadge, Avatar, VStack, useDisclosure,
  useToast, Icon, Spacer, Link, Circle, Text, Box, Center,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, PopoverArrow, PopoverCloseButton,
} from '@chakra-ui/react';
import {
  IoMdAdd, IoMdInformationCircleOutline,
} from 'react-icons/io';
import {
  IoCloseOutline,
} from 'react-icons/io5';
import {
  MdRotateRight,
} from 'react-icons/md';
import {
  RedditShareButton, TwitterShareButton, TwitterIcon, RedditIcon,
} from 'react-share';
import AddStreamerModal from './AddStreamerModal';

const arrayRotate = (arr, reverse) => {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
  return arr;
};

const Main = forwardRef(({
  streamersList,
  setStreamersList,
  maxNumberOfStreamers,
  selectedLayout,
}, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [streamersOrderedbyUser, setStreamersOrderedbyUser] = useState(streamersList);
  const [shareURL, setShareURL] = useState('');
  const toast = useToast();
  const router = useRouter();

  // this is ugly but prevents iframes from refreshing
  useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
  }));

  useEffect(() => {
    setStreamersOrderedbyUser(streamersList);
  }, [streamersList]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setShareURL(`https://multistream.gg${url}`);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <VStack
      bgGradient="linear(to-t, #9147ff55, #333)"
      h={isMobile ? '100%' : '100vh'}
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
      />
      {
        streamersOrderedbyUser.map((currentStreamer, index) => (
          <Avatar
            _hover={{
              color: '#ffa502',
              transform: 'scale(1.05)',
              'box-shadow': '0 0 8px #888',
            }}
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
              borderColor="#666"
              bg="#666"
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
          _hover={{
            color: '#ffa502',
            transform: 'scale(1.05)',
            'box-shadow': '0 0 8px #888',
          }}
          borderColor="#9147ff"
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
        <VStack>
          <Circle
            _hover={{
              color: '#ffa502',
              transform: 'scale(1.05)',
              'box-shadow': '0 0 8px #888',
            }}
            borderColor="#9147ff"
            borderWidth="2px"
            w={8}
            h={8}
            mb="16px"
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

              const updatedListOfStreamers = arrayRotate([...streamersOrderedbyUser], true);

              setStreamersOrderedbyUser(updatedListOfStreamers);

              // currently commented out because this is causing a new rerender on [[...params]] because of router.push
              // I've already checked all hooks and nothing is printed there

              // const loginNames = streamersOrderedbyUser.map((streamer) => streamer.login || streamer.broadcaster_login);
              // const path = loginNames.join('/');

              // router.push({
              //   pathname: `/${path}`,
              // }, undefined, { shallow: true });
            }}
          >
            <Icon
              as={MdRotateRight}
              color="#fff"
            />
          </Circle>
          <Text
            letterSpacing="wider"
            fontWeight="bold"
            color="#fff"
            fontSize="9px"
            mb="8px"
          >
            SHARE
          </Text>
          <RedditShareButton
            url={shareURL}
            title={`${streamersList.map((streamer) => streamer.display_name).join(', ')} are streaming right now!`}
            windowWidth={660}
            windowHeight={460}
          >
            <Circle
              _hover={{
                transform: 'scale(1.05)',
              }}
            >
              <RedditIcon size={32} round />
            </Circle>
          </RedditShareButton>
          <TwitterShareButton
            url={shareURL}
          >
            <Circle
              _hover={{
                transform: 'scale(1.05)',
              }}
            >
              <TwitterIcon size={32} round />
            </Circle>
          </TwitterShareButton>
        </VStack>
        )}
      </VStack>
      <Spacer />
      <Box mb="16px">
        <Popover placement="right">
          <PopoverTrigger>
            <VStack>
              <Center>
                <Icon
                  mb="8px"
                  as={IoMdInformationCircleOutline}
                  color="#fff"
                  _hover={{ color: '#ddd' }}
                />
              </Center>
              <Center>
                <div
                  className="verticalDiv"
                >
                  <Text
                    color="#fff"
                    fontSize="lg"
                    fontWeight="semibold"
                    letterSpacing="wide"
                  >
                    MULTISTREAM.GG
                  </Text>
                </div>
              </Center>
            </VStack>
          </PopoverTrigger>
          <PopoverContent
            mt="-16px"
            color="#fff"
            bg="#333"
            fontSize="sm"
          >
            <PopoverHeader fontWeight="semibold">Feedback or ideas? Write me!</PopoverHeader>
            <PopoverArrow bg="#333" />
            <PopoverCloseButton bg="#9147ff" />
            <PopoverBody>
              Twitter:
              {' '}
              <Link color="#9147ff" href="https://twitter.com/NicolaGenesin">
                @NicolaGenesin
              </Link>
              <br />
              Github:
              {' '}
              <Link color="#9147ff" href="https://github.com/NicolaGenesin">
                NicolaGenesin
              </Link>
              <br />
              Reddit:
              {' '}
              <Link color="#9147ff" href="https://www.reddit.com/message/compose/?to=1911z">
                1911z
              </Link>
              <br />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
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
            width:auto;
            height:auto;
        }`
        }
      </style>
    </VStack>
  );
});

export default Main;
