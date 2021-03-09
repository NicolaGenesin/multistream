import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Flex, HStack,
} from '@chakra-ui/react';
import {
  TwitchEmbed,
} from 'react-twitch-embed';
import { useTimeout } from 'react-use';
import LeftBar from '../components/LeftBar';

const maxNumberOfStreamers = 4;
const layouts = {
  '0-players': {

  },
  '1-players': [
    {
      values: ['100%'],
      heightPercentagePerRow: '100%',
    },
  ],
  '2-players': [
    {
      values: ['100%', '100%'],
      heightPercentagePerRow: '50%',
    },
  ],
  '3-players': [
    {
      values: ['100%', '50%', '50%'],
      heightPercentagePerRow: '50%',
    },
  ],
  '4-players': [
    {
      values: ['90%', '30%', '30%', '30%'],
      heightPercentagePerRow: '50%',
    },
  ],
};

const Main = ({ params }) => {
  const router = useRouter();
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
      style={{ order: index }}
      id={streamer.broadcaster_login}
      className="iframe-wrapper"
      flex={selectedLayout.values[index]}
      width="100%"
      height={selectedLayout.heightPercentagePerRow}
    >
      <TwitchEmbed
        style={{ display: 'block', width: '100%' }}
        channel={streamer.broadcaster_login}
        id={streamer.broadcaster_login}
        key={streamer.broadcaster_login}
        theme="dark"
        autoplay={false}
        withChat={false}
        onVideoPause={() => console.log(':(')}
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

    if (hasFetchedImages) { return; }

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
        .find((streamer) => streamer.login === streamerInfo.login);

      existingStreamerRecord.thumbnail_url = streamerInfo.profile_image_url;
      existingStreamerRecord.broadcaster_login = streamerInfo.login;
    });

    setHasFetchedImages(true);
    setStreamersList(newList);
  }, [streamersList]);

  if (!params) {
    return <Box />;
  }

  return (
    <Box>
      <HStack
        spacing={0}
      >
        <LeftBar
          streamersList={streamersList}
          setStreamersList={setStreamersList}
          maxNumberOfStreamers={maxNumberOfStreamers}
        />
        <Flex
          bg="#18161a"
          h="100vh"
          w="100%"
          flexDirection="row"
          flexWrap="wrap"
          justifyItems="flex-start"
          alignItems="flex-start"
        >
          {gridItems}
        </Flex>
      </HStack>
    </Box>
  );
};

Main.getInitialProps = async function ({ query }) {
  return {
    params: query.params.map((username) => ({
      login: username,
    })),
  };
};

export default Main;
