import React, {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { useRouter } from 'next/router';
import {
  AvatarBadge, Avatar, VStack, useDisclosure,
  useToast, Icon, Spacer, Link, Circle, Text, Box, Center,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, PopoverArrow, PopoverCloseButton,
} from '@chakra-ui/react';
import {
  SiTwitch,
} from 'react-icons/si';
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
  RedditShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton,
  TwitterIcon, TelegramIcon, WhatsappIcon, RedditIcon,
} from 'react-share';
import AddStreamerModal from './AddStreamerModal';
import Triangle from './Triangle';

const Main = forwardRef(({
  streamersList,
  setStreamersList,
  maxNumberOfStreamers,
  selectedLayout,
}, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <VStack>
          <Circle
            _hover={{ bg: '#555' }}
            borderColor="#fff"
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
          >
            SHARE
          </Text>
          <RedditShareButton
            url={shareURL}
            title={`${streamersList.map((streamer) => streamer.display_name).join(', ')} are streaming right now!`}
            windowWidth={660}
            windowHeight={460}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
          <TwitterShareButton
            url={shareURL}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareURL}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TelegramShareButton
            url={shareURL}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
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
              Email: 1911genesin at gmail.com
            </PopoverBody>
          </PopoverContent>
        </Popover>
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
            width:auto;
            height:auto;
        }`
        }
      </style>
    </VStack>
  );
});

export default Main;
