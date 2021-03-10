import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Flex, HStack,
} from '@chakra-ui/react';
import {
  TwitchEmbed,
} from 'react-twitch-embed';
import { useTimeout } from 'react-use';
import LeftBar from '../components/LeftBar';
import EmptyState from '../components/EmptyState';
import Chat from '../components/Chat';

const maxNumberOfStreamers = 4;
const layouts = {
  '0-players': {

  },
  '1-players': [
    {
      values: ['100%'],
      heightPercentagePerRow: ['100%', '100%'],
    },
  ],
  '2-players': [
    {
      values: ['100%', '100%'],
      heightPercentagePerRow: ['60%', '40%'],
    },
  ],
  '3-players': [
    {
      values: ['100%', '50%', '50%'],
      heightPercentagePerRow: ['60%', '40%'],
    },
  ],
  '4-players': [
    {
      values: ['90%', '30%', '30%', '30%'],
      heightPercentagePerRow: ['60%', '40%'],
    },
  ],
};

const Main = ({ params }) => {
  const router = useRouter();
  const leftBarRef = useRef();
  const [isReady, cancel] = useTimeout(500);
  const [hasFetchedImages, setHasFetchedImages] = useState(false);
  const [streamersList, setStreamersList] = useState(params);
  const numberOfStreamers = streamersList.length;
  const selectableLayouts = layouts[`${numberOfStreamers}-players`];
  const selectedLayoutIndex = 0;
  const selectedLayout = selectableLayouts[selectedLayoutIndex];
  const gridItems = isReady() ? streamersList.map((streamer, index) => (
    <Box
      // bg={['#0ff', '#f0f', '#00f'][index]}
      key={streamer.broadcaster_login}
      style={{
        order: index,
        flex: `${selectedLayout.values[index]}`,
        height: index === 0 ? selectedLayout.heightPercentagePerRow[0] : selectedLayout.heightPercentagePerRow[1],
      }}
      id={streamer.broadcaster_login}
      className="iframe-wrapper"
      width="100%"
    >
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
  )) : '';

  useEffect(() => {
    if (params) {
      setStreamersList(params);
    }
  }, [params]);

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
        Authorization: 'Bearer ' + '0joge0i8si4qv6eifd9weoztm510cn',
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
    <Box>
      <HStack
        spacing={0}
      >
        <LeftBar
          ref={leftBarRef}
          streamersList={streamersList}
          setStreamersList={setStreamersList}
          maxNumberOfStreamers={maxNumberOfStreamers}
          selectedLayout={selectedLayout}
        />
        <Flex
          bg="#f0f"
          h="100vh"
          w="100%"
        >
          <Flex
            bg="#18161a"
            h="100%"
            flex={streamsFlex}
            flexDirection="row"
            flexWrap="wrap"
            justifyItems="flex-start"
            alignItems="flex-start"
          >
            {!streamersList.length && (
            <EmptyState
              action={leftBarRef.current && leftBarRef.current.openModal}
            />
            )}
            {gridItems}
          </Flex>
          {streamersList.length > 0 && (
          <Box
            id="chat-box"
            flex={chatFlex}
            h="100%"
          >
            <Chat
              key={`${Math.random()}`} // force reload the chat iframe when the stream list changes
              streamersList={streamersList}
              chatFlex={chatFlex}
            />
          </Box>
          )}
        </Flex>
      </HStack>
      <TwitchEmbed
        // this is a dummy component used to load all twitch resources before we add real streamers
        style={{ display: 'none', width: '100%' }}
        channel="tom"
        id="tom"
        key="tom"
        theme="dark"
        autoplay={false}
        withChat={false}
        muted
      />
    </Box>
  );
};

Main.getInitialProps = async function ({ query }) {
  return {
    params: (query.params || []).map((username) => ({
      login: username,
    })),
  };
};

export default Main;
