import React, {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { isMobile } from 'react-device-detect';
import {
  AvatarBadge, Avatar, VStack, useDisclosure, HStack,
  useToast, Icon, Spacer, Link, Circle, Text, Box,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, PopoverCloseButton,
} from '@chakra-ui/react';
import {
  IoMdAdd,
} from 'react-icons/io';
import {
  IoCloseOutline, IoInformationSharp,
} from 'react-icons/io5';
import {
  RiLayoutMasonryLine,
} from 'react-icons/ri';
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
  selectableLayouts,
  router,
}, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [streamersOrderedbyUser, setStreamersOrderedbyUser] = useState(streamersList);
  const [shareURL, setShareURL] = useState('');
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(0);
  const toast = useToast();

  // this is ugly but prevents iframes from refreshing
  useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
  }));

  useEffect(() => {
    setStreamersOrderedbyUser(streamersList);
    setSelectedLayoutIndex(0);

    const newSelectedLayout = selectableLayouts[0];
    const wrappers = document.getElementsByClassName('iframe-wrapper');

    for (const wrapper of wrappers) {
      const currentOrder = parseInt(wrapper.style.order);

      wrapper.style.flex = `${newSelectedLayout.xvalues[currentOrder]}`;
      wrapper.style.height = `${newSelectedLayout.yvalues[currentOrder]}`;
    }
  }, [streamersList]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setShareURL(`https://multistream.gg${url}`);

      try {
        console.log(`[GA] Send ${url} pageview`);
        ga('set', 'page', url);
        ga('send', 'pageview');
      } catch (error) {
        console.log('[GA] Failed (handleRouteChange)');
      }
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
      w="56px"
      _hover={{ w: '240px' }}
      textAlign="left"
      style={{
        transition: '0.2s ease',
      }}
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
      <Text
        letterSpacing="tight"
        fontWeight="bold"
        color="#fff"
        fontSize="10px"
        mb="8px"
      >
        STREAMS
      </Text>
      {
        streamersOrderedbyUser.map((currentStreamer, index) => (
          <HStack
            w="100%"
          >
            <Avatar
              _hover={{
                transform: 'translate(8%, -2%)',
                'box-shadow': '-1px 1px  #9147ff, -2px 2px  #9147ff, -3px 3px  #9147ff, -4px 4px  #9147ff',
              }}
              style={{
                transition: '0.2s ease',
              }}
              borderColor="#fff"
              borderWidth="0px"
              key={`${index}`}
              w={10}
              h={10}
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
            <Text
              fontWeight="semibold"
              color="#fff"
              fontSize="sm"
              style={{
                overflow: 'hidden',
                'white-space': 'nowrap',
                'text-overflow': 'ellipsis',
              }}
            >
              {currentStreamer.display_name}
            </Text>
          </HStack>
        ))
      }
      <VStack
        w="100%"
        pt={streamersList.length ? '16px' : '0px'}
      >
        {streamersList.length > 1 && (
          <Box
            w="100%"
          >
            <HStack
              mb="8px"
              onClick={() => {
                const wrappers = document.getElementsByClassName('iframe-wrapper');
                const selectedLayout = selectableLayouts[selectedLayoutIndex];

                for (const wrapper of wrappers) {
                  const nextOrder = parseInt(wrapper.style.order) + 1;
                  if (nextOrder >= streamersList.length) {
                    nextOrder = 0;
                  }

                  wrapper.style.order = `${nextOrder}`;
                  wrapper.style.flex = `${selectedLayout.xvalues[nextOrder]}`;
                  wrapper.style.height = `${selectedLayout.yvalues[nextOrder]}`;
                }

                const updatedListOfStreamers = arrayRotate([...streamersOrderedbyUser], true);

                setStreamersOrderedbyUser(updatedListOfStreamers);

                const loginNames = updatedListOfStreamers
                  .map((streamer) => streamer.login || streamer.broadcaster_login);
                const path = loginNames.join('/');

                router.push({
                  pathname: `/${path}`,
                }, undefined, { shallow: true });
              }}
            >
              <Circle
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
              >
                <Icon
                  as={MdRotateRight}
                  color="#fff"
                />
              </Circle>
              <Text
                style={{
                  overflow: 'hidden',
                  'white-space': 'nowrap',
                }}
                fontWeight="semibold"
                color="#fff"
                fontSize="sm"
              >
                Rotate streams
              </Text>
            </HStack>
            <HStack
              onClick={() => {
                let newSelectedLayoutIndex = selectedLayoutIndex + 1;

                if (newSelectedLayoutIndex > selectableLayouts.length - 1) {
                  newSelectedLayoutIndex = 0;
                }

                setSelectedLayoutIndex(newSelectedLayoutIndex);

                const wrappers = document.getElementsByClassName('iframe-wrapper');
                const newSelectedLayout = selectableLayouts[newSelectedLayoutIndex];

                for (const wrapper of wrappers) {
                  const currentOrder = parseInt(wrapper.style.order);

                  wrapper.style.flex = `${newSelectedLayout.xvalues[currentOrder]}`;
                  wrapper.style.height = `${newSelectedLayout.yvalues[currentOrder]}`;
                }
              }}
            >
              <Circle
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
              >
                <Icon
                  as={RiLayoutMasonryLine}
                  color="#fff"
                />
              </Circle>
              <Text
                style={{
                  overflow: 'hidden',
                  'white-space': 'nowrap',
                }}
                fontWeight="semibold"
                color="#fff"
                fontSize="sm"
              >
                Change layout
              </Text>
            </HStack>
          </Box>
        )}
        <HStack
          w="100%"
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
          <Circle
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
          >
            <Icon
              as={IoMdAdd}
              color="#fff"
            />
          </Circle>
          <Text
            style={{
              overflow: 'hidden',
              'white-space': 'nowrap',
            }}
            fontWeight="semibold"
            color="#fff"
            fontSize="sm"
          >
            Add streamer
          </Text>
        </HStack>
        {streamersList.length > 1 && (
        <VStack pt="16px" w="100%">
          <Text
            letterSpacing="wider"
            fontWeight="bold"
            color="#fff"
            fontSize="10px"
            mb="8px"
          >
            SHARE
          </Text>
          <HStack w="100%">
            <RedditShareButton
              url={shareURL}
              title={`${streamersList.map((streamer) => streamer.display_name).join(', ')} are streaming right now!`}
              windowWidth={660}
              windowHeight={460}
            >
              <Circle
                h={10}
                w={10}
                _hover={{
                  transform: 'translate(8%, -2%)',
                  'box-shadow': '-1px 1px  #9147ff, -2px 2px  #9147ff, -3px 3px  #9147ff, -4px 4px  #9147ff',
                }}
                style={{
                  transition: '0.2s ease',
                }}
              >
                <RedditIcon size={48} round />
              </Circle>
            </RedditShareButton>
            <Text
              style={{
                overflow: 'hidden',
                'white-space': 'nowrap',
                'text-overflow': 'ellipsis',
              }}
              fontWeight="semibold"
              color="#fff"
              fontSize="sm"
            >
              Share streams to Reddit
            </Text>
          </HStack>
          <HStack w="100%">
            <TwitterShareButton
              url={shareURL}
            >
              <Circle
                h={10}
                w={10}
                _hover={{
                  transform: 'translate(8%, -2%)',
                  'box-shadow': '-1px 1px  #9147ff, -2px 2px  #9147ff, -3px 3px  #9147ff, -4px 4px  #9147ff',
                }}
                style={{
                  transition: '0.2s ease',
                }}
              >
                <TwitterIcon size={48} round />
              </Circle>
            </TwitterShareButton>
            <Text
              style={{
                overflow: 'hidden',
                'white-space': 'nowrap',
                'text-overflow': 'ellipsis',
              }}
              fontWeight="semibold"
              color="#fff"
              fontSize="sm"
            >
              Share streams to Twitter
            </Text>
          </HStack>
        </VStack>
        )}
      </VStack>
      <Spacer />
      <Box mb="16px" w="100%">
        <Popover placement="right-end">
          <PopoverTrigger>
            <HStack
              w="100%"
              h="100%"
              style={{
                overflow: 'hidden',
              }}
            >
              <div
                className="verticalDiv"
              >
                <Text
                  color="#ffffff22"
                  fontSize="26px"
                  fontWeight="semibold"
                  letterSpacing="wide"
                >
                  MULTISTREAM.GG
                </Text>
              </div>
              <Spacer />
              <VStack h="100%">
                <Spacer />
                <Circle
                  style={{
                    transition: '0.2s ease',
                  }}
                  borderColor="#9147ff"
                  borderWidth="2px"
                  w={10}
                  h={10}
                >
                  <Icon
                    as={IoInformationSharp}
                    color="#fff"
                    _hover={{ color: '#ddd' }}
                  />
                </Circle>
              </VStack>
            </HStack>
          </PopoverTrigger>
          <PopoverContent
            mt="-16px"
            color="#fff"
            bg="#333"
            fontSize="sm"
          >
            <PopoverHeader fontWeight="semibold">Feedback or ideas? Write me!</PopoverHeader>
            <PopoverCloseButton bg="#9147ff" />
            <PopoverBody>
              Discord:
              {' '}
              <Link color="#b482ff" href="https://discordapp.com/users/156165203619348480">
                Filodream
              </Link>
              <br />
              Twitter:
              {' '}
              <Link color="#b482ff" href="https://twitter.com/NicolaGenesin">
                @NicolaGenesin
              </Link>
              <br />
              Github:
              {' '}
              <Link color="#b482ff" href="https://github.com/NicolaGenesin">
                NicolaGenesin
              </Link>
              <br />
              Reddit:
              {' '}
              <Link color="#b482ff" href="https://www.reddit.com/message/compose/?to=1911z">
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
