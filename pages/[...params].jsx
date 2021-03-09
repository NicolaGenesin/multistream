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

// we just got the usernames from the url path
// create a new array so it is compatible with the searched ones
const params = ['neenoh', 'justbree', 'tom'].map((username) => ({
  display_name: username,
}));

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

const Main = () => {
  const router = useRouter();
  // const { params } = router.query;
  const [isReady, cancel] = useTimeout(500);
  const [streamersList, setStreamersList] = useState(params);
  const numberOfStreamers = streamersList.length;
  const selectableLayouts = layouts[`${numberOfStreamers}-players`];
  const selectedLayoutIndex = 0;
  const selectedLayout = selectableLayouts[selectedLayoutIndex];
  const gridItems = isReady() ? streamersList.map((streamer, index) => (
    <Box
        // bg={['#0ff', '#f0f', '#00f'][index]}
      key={streamer.display_name}
      style={{ order: index }}
      id={streamer.display_name}
      className="iframe-wrapper"
      flex={selectedLayout.values[index]}
      width="100%"
      height={selectedLayout.heightPercentagePerRow}
    >
      <TwitchEmbed
        style={{ display: 'block', width: '100%' }}
        channel={streamer.display_name}
        id={streamer.display_name}
        key={streamer.display_name}
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

export default Main;
