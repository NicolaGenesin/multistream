import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Flex, HStack,
} from '@chakra-ui/react';
import {
  TwitchEmbed,
} from 'react-twitch-embed';
import { isMobile } from 'react-device-detect';
import LeftBar from '../components/LeftBar';
import EmptyState from '../components/EmptyState';
import Chat from '../components/Chat';

const maxNumberOfStreamers = 6;
const layouts = {
  '0-players': [
    {
      xvalues: ['100%'],
      yvalues: ['100%'],
    },
  ],
  '1-players': [
    {
      xvalues: ['100%'],
      yvalues: ['100%'],
    },
    {
      xvalues: ['100%'],
      yvalues: ['100%'],
    },
    {
      xvalues: ['100%'],
      yvalues: ['100%'],
    },
  ],
  '2-players': [
    {
      xvalues: ['100%', '100%'],
      yvalues: ['60%', '40%'],
    },
    {
      xvalues: ['100%', '100%'],
      yvalues: ['70%', '30%'],
    },
    {
      xvalues: ['100%', '100%'],
      yvalues: ['50%', '50%'],
    },
  ],
  '3-players': [
    {
      xvalues: ['100%', '50%', '50%'],
      yvalues: ['50%', '50%', '50%'],
    },
    {
      xvalues: ['100%', '50%', '50%'],
      yvalues: ['70%', '30%', '30%'],
    },
    {
      xvalues: ['100%', '100%', '100%'],
      yvalues: ['33.3333%', '33.3333%', '33.3333%'],
    },
  ],
  '4-players': [
    {
      xvalues: ['100%', '30%', '30%', '30%'],
      yvalues: ['60%', '40%', '40%', '40%'],
    },
    {
      xvalues: ['50%', '50%', '50%', '50%'],
      yvalues: ['50%', '50%', '50%', '50%'],
    },
    {
      xvalues: ['100%', '50%', '50%', '100%'],
      yvalues: ['33.3333%', '33.3333%', '33.3333%', '33.3333%'],
    },
  ],
  '5-players': [
    {
      xvalues: ['100%', '33.3333%', '33.3333%', '33.3333%', '100%'],
      yvalues: ['33.3333%', '33.3333%', '33.3333%', '33.3333%', '33.3333%'],
    },
    {
      xvalues: ['100%', '25%', '25%', '25%', '25%'],
      yvalues: ['60%', '40%', '40%', '40%', '40%'],
    },
    {
      xvalues: ['100%', '50%', '50%', '50%', '50%'],
      yvalues: ['33.3333%', '33.3333%', '33.3333%', '33.3333%', '33.3333%'],
    },
  ],
  '6-players': [
    {
      xvalues: ['100%', '25%', '25%', '25%', '25%', '100%'],
      yvalues: ['33.3333%', '33.3333%', '33.3333%', '33.3333%', '33.3333%', '33.3333%'],
    },
    {
      xvalues: ['100%', '33.3333%', '33.3333%', '33.3333%', '50%', '50%'],
      yvalues: ['33.3333%', '33.3333%', '33.3333%', '33.3333%', '33.3333%', '33.3333%'],
    },
    {
      xvalues: ['50%', '50%', '50%', '50%', '50%', '50%'],
      yvalues: ['33.3333%', '33.3333%', '33.3333%', '33.3333%', '33.3333%', '33.3333%'],
    },
  ],
};

const Main = ({ params }) => {
  const router = useRouter();
  const leftBarRef = useRef();
  const [hasFetchedImages, setHasFetchedImages] = useState(false);
  const [streamersList, setStreamersList] = useState(params);
  const numberOfStreamers = streamersList.length;
  const selectableLayouts = layouts[`${numberOfStreamers}-players`];
  const selectedLayoutIndex = 0;
  const selectedLayout = selectableLayouts[selectedLayoutIndex];
  const [gridItems, setGridItems] = useState('');

  useEffect(() => {
    if (params) {
      setStreamersList(params);
    }
  }, [params]);

  useEffect(() => {
    if (streamersList.length) {
      const createAndSetGridItems = () => {
        const items = streamersList.map((streamer, index) => (
          <Box
            // bg={['#555', '#999', '#777', '#222', '#444', '#888'][index]}
            key={streamer.broadcaster_login}
            style={{
              order: index,
              flex: `${selectedLayout.xvalues[index]}`,
              height: `${selectedLayout.yvalues[index]}`,
            }}
            id={streamer.broadcaster_login}
            className="iframe-wrapper"
            width="100%"
          >
            {/* {streamer.broadcaster_login} */}
            <TwitchEmbed
              style={{ display: 'block', width: '100%' }}
              channel={streamer.broadcaster_login}
              id={streamer.broadcaster_login}
              key={streamer.broadcaster_login}
              theme="dark"
              autoplay
              withChat={false}
              muted={index > 0}
            />
          </Box>
        ));

        setGridItems(items);
      };

      if (window.Twitch) {
        console.log('[window.Twitch] Mounted');
        createAndSetGridItems();
      } else {
        const waitMs = 2500;

        setTimeout(() => {
          console.log(`[window.Twitch] Not mounted, waiting ${waitMs}ms`);
          createAndSetGridItems();
        }, waitMs);
      }
    } else {
      setGridItems('');
    }
  }, [streamersList]);

  useEffect(async () => {
    const loginNames = streamersList.map((streamer) => streamer.login || streamer.broadcaster_login);
    const path = loginNames.join('/');
    // todo check if it's not the same to avoid unnecessary rendering
    router.push({
      pathname: `/${path}`,
    }, undefined, { shallow: true });

    if (hasFetchedImages || !streamersList.length) { return; }

    const query = loginNames.map((name) => `login=${name}`).join('&');
    const response = await fetch(`https://api.twitch.tv/helix/users?${query}`, {
      method: 'GET',
      headers: {
        'client-id': 'oc2v6nbh3v12i5i5x8et8bo7amnu9o',
        Authorization: 'Bearer ' + 'iu705cvxoeq65oe0gnvoh119g0unan',
      },
    });

    const result = await response.json();
    const newList = [...streamersList];

    result.data.forEach((streamerInfo) => {
      const existingStreamerRecord = newList
        .find((streamer) => (
          streamer.login === streamerInfo.login || streamer.broadcaster_login === streamerInfo.login
        ));

      if (!existingStreamerRecord.thumbnail_url) {
        existingStreamerRecord.thumbnail_url = streamerInfo.profile_image_url;
      }

      if (!existingStreamerRecord.broadcaster_login) {
        existingStreamerRecord.broadcaster_login = streamerInfo.login;
      }

      if (!existingStreamerRecord.display_name) {
        existingStreamerRecord.display_name = streamerInfo.display_name;
      }
    });

    setHasFetchedImages(true);
    setStreamersList(newList);
  }, [streamersList]);

  if (!params) {
    return <Box />;
  }

  const streamsFlex = 7;
  const chatFlex = 3;

  return (
    <div className="backgroundLayout">
      <HStack
        spacing={0}
      >
        <div className={isMobile ? 'leftBarMobile' : ''}>
          <LeftBar
            ref={leftBarRef}
            streamersList={streamersList}
            setStreamersList={setStreamersList}
            maxNumberOfStreamers={maxNumberOfStreamers}
            selectableLayouts={selectableLayouts}
            router={router}
          />
        </div>
        <Flex
          h="100vh"
          w="100%"
        >
          <Flex
            h="100%"
            flex={streamsFlex}
            flexDirection="row"
            flexWrap="wrap"
            justifyItems="flex-start"
            alignItems="flex-start"
          >
            {!streamersList.length && (
            <EmptyState
              setStreamersList={setStreamersList}
              action={leftBarRef.current && leftBarRef.current.openModal}
            />
            )}
            {gridItems}
          </Flex>
          {(streamersList.length > 0 && !isMobile) && (
          <Box
            id="chat-box"
            flex={chatFlex}
            h="100%"
          >
            <Chat
              streamersList={streamersList}
              chatFlex={chatFlex}
            />
          </Box>
          )}
        </Flex>
      </HStack>
      <style jsx>
        {`
          .leftBarMobile {
            height: 100vh;
            overflow-y: scroll;
            float: left;
          }

          .backgroundLayout {
            background: linear-gradient(45deg, #111, #47237d, #111, #42118c);
            background-size: 600% 600%;
            animation: gradient 15s ease infinite;
          }

          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}

      </style>
    </div>
  );
};

Main.getInitialProps = async function ({ query }) {
  return {
    params: (query.params || []).map((username) => {
      const login = username.toLowerCase();
      return {
        broadcaster_login: login,
        login,
      };
    }),
  };
};

export default Main;
