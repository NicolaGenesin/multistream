// passaggio domani
// pippo
// fiori

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Button, Flex, GridItem,
} from '@chakra-ui/react';
import {
  TwitchEmbed,
} from 'react-twitch-embed';

const params = ['neenoh', 'justbree', 'tom'];
const numberOfStreamers = params.length;
const layouts = {
  '0-players': {

  },
  '1-players': {

  },
  '2-players': {

  },
  '3-players': [
    {
      values: ['99%', '33%', '33%'],
      heightPercentagePerRow: '50%',
    },
  ],
};
const selectableLayouts = layouts[`${numberOfStreamers}-players`];
const selectedLayoutIndex = 0;
const selectedLayout = selectableLayouts[selectedLayoutIndex];

const Main = () => {
  const router = useRouter();
  // const { params } = router.query;
  const [streamersIdList, setStreamersIdList] = useState(params);

  const gridItems = streamersIdList.map((streamerId, index) => (
    <Box
      key={streamerId}
      style={{ order: index }}
      id={streamerId}
      className="iframe-wrapper"
      flex={selectedLayout.values[index]}
      width="100%"
      height={selectedLayout.heightPercentagePerRow}
    >
      {streamerId}
      <TwitchEmbed
        channel={streamerId}
        id={streamerId}
        key={streamerId}
        theme="dark"
        autoplay={false}
        withChat={false}
        onVideoPause={() => console.log(':(')}
      />
    </Box>
  ));

  const [components, setComponents] = useState(gridItems);

  useEffect(() => {
    if (params) {
      setStreamersIdList(params);
      setComponents(gridItems);
    }
  }, [params]);

  // if (!params) {
  //   return <Box />;
  // }

  console.log(components);

  return (
    <Box>
      <Button
        onClick={() => {
          const wrappers = document.getElementsByClassName('iframe-wrapper');

          console.log(wrappers);

          for (const wrapper of wrappers) {
            const nextOrder = parseInt(wrapper.style.order) + 1;
            if (nextOrder >= numberOfStreamers) {
              nextOrder = 0;
            }

            wrapper.style.order = `${nextOrder}`;
          }
        }}
      >
        Rotate
      </Button>
      <Flex
        h="100vh"
        flexDirection="row"
        flexWrap="wrap"
        justifyItems="flex-start"
        alignItems="flex-start"
      >
        {gridItems}
      </Flex>
    </Box>
  );
};

Main.getInitialProps = async function ({ }) {
  return {};
};

export default Main;
