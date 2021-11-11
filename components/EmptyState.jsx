import React, { useState, useEffect } from 'react';
import {
  Box, Button, VStack, Heading, Text, Link, Stack, StackDivider,
} from '@chakra-ui/react';
import TrendingStreamers from './TrendingStreamers';
import Footer from './footer/Footer';

const Main = ({ action, setStreamersList }) => {
  const [trendingStreamers, setTrendingStreamers] = useState([]);

  const groups = [];
  const size = 3;

  for (let i = 0; i < trendingStreamers.length; i += size) {
    groups.push(trendingStreamers.slice(i, i + size));
  }

  useEffect(async () => {
    if (!trendingStreamers.length) {
      const response = await fetch('https://api.twitch.tv/helix/streams/?first=30', {
        method: 'GET',
        headers: {
          'client-id': 'oc2v6nbh3v12i5i5x8et8bo7amnu9o',
          Authorization: 'Bearer ' + 'ep7ye6kf80iyrwng92t9uy49257ggp',
        },
      });

      const result = await response.json();

      setTrendingStreamers(result.data);
    }
  }, [trendingStreamers]);

  return (
    <Box w="100%" h="100%" color="white">
      <Box maxHeight="100%" pt="5%" overflow="auto">
        <VStack>
          <Heading
            as="h1"
            mt="16px"
            mb={['0px', '16px']}
            textAlign="center"
            p="16px"
            fontSize={['xl', '5xl']}
          >
            Watch multiple Twitch streams on Your Screen
          </Heading>
          <Box mb={['0px', '48px']}>
            <Button
              boxShadow="dark-lg"
              letterSpacing="wide"
              size="lg"
              // p='8px'
              w="100%"
              color="#9147ff"
              bg="#fff"
              _hover={{ bg: '#ebedf0' }}
              onClick={() => {
                action();
              }}
            >
              Add a Streamer
            </Button>
          </Box>
          <Heading pt="5%" pb="16px" fontSize={['xl']}>
            GG! Welcome to Multistream!
          </Heading>
          <Box textAlign="center" px="16px">
            <Text>
              You can use this simple tool to watch up to 8 Twitch streams at the same time (as long as your computer and bandwidth can handle it!).
            </Text>
            <Heading as="h3" py="16px" fontSize={['lg']}>
              How to use
            </Heading>
            <Text>
              Simply add the streamers you want to watch by clicking the "Add a Streamer" button on the left bar.
            </Text>
            <Text>
              As an alternative, you can put the streamers usernames in the url (e.g.
              {' '}
              <b><Link href="https://multistream.gg/neenoh/vombuz">multistream.gg/neenoh/vombuz</Link></b>
              )
            </Text>
            <Text>
              Multistream will provide you a default layout for your streams that you can later change.
            </Text>
            <Text>
              You can also rotate them to let you focus on the stream you prefer by accessing the left bar.
            </Text>
          </Box>
          <Heading
            py="16px"
            size="sm"
            textAlign="center"
            as="h3"
          >
            Check out the top streamers right now!
          </Heading>
          {groups.map((group) => (
            <Link href={`https://multistream.gg/${group.map((streamer) => streamer.user_login).join('/')}`} style={{ textDecoration: 'none' }}>
              <TrendingStreamers trendingStreamers={group} />
            </Link>
          ))}
        </VStack>
        <Footer />
      </Box>
    </Box>
  );
};

export default Main;
