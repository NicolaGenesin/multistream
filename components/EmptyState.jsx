import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Link,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import TrendingStreamers from "./TrendingStreamers";
import Footer from "./footer/Footer";

const Main = ({ action, setStreamersList }) => {
  const [trendingStreamers, setTrendingStreamers] = useState([]);

  const groups = [];
  const size = 3;

  for (let i = 0; i < trendingStreamers.length; i += size) {
    groups.push(trendingStreamers.slice(i, i + size));
  }

  useEffect(async () => {
    if (!trendingStreamers.length) {
      const response = await fetch(
        "https://api.twitch.tv/helix/streams/?first=30",
        {
          method: "GET",
          headers: {
            "client-id": "oc2v6nbh3v12i5i5x8et8bo7amnu9o",
            Authorization: "Bearer " + "fd1x4svq80i11wzixvxh46rby25u2e",
          },
        }
      );

      const result = await response.json();

      setTrendingStreamers(result.data);
    }
  }, [trendingStreamers]);

  return (
    <Box w="100%" h="100%" color="white">
      <Box maxHeight="100%" pt="5%" overflow="auto">
        <VStack mx="16px">
          <Heading
            as="h1"
            mt="16px"
            mb={["0px", "16px"]}
            textAlign="center"
            p="16px"
            fontSize={["xl", "5xl"]}
          >
            Watch multiple Twitch streams on Your Screen
          </Heading>
          <Box pb="48px">
            <Button
              boxShadow="dark-lg"
              borderRadius="999px"
              p="28px"
              fontSize="26px"
              letterSpacing="wide"
              size="xl"
              w="100%"
              color="#9147ff"
              bg="#fff"
              _hover={{ bg: "#ebedf0" }}
              onClick={() => {
                action();
              }}
            >
              Add a Streamer
            </Button>
          </Box>
          <Box textAlign="center" p="16px" bg="#44555555" borderRadius="8px">
            <Heading pb="16px" fontSize={["xl"]}>
              GG! Welcome to Multistream!
            </Heading>
            <Text>
              You can use this free website to watch up to 6 Twitch streams at
              the same time, as long as your computer and bandwidth can handle
              it!
            </Text>
            <Text>
              I’ve built it to watch tournaments without the need of arranging
              multiple windows and to make it easy to share. I hope you’ll enjoy
              it!
            </Text>
            <Heading as="h3" py="16px" fontSize={["lg"]}>
              How to use it
            </Heading>
            <Text>
              Add the streamers you want to watch by clicking the "Add a
              Streamer" button on the left bar.
            </Text>
            <Text>
              You'll see a default layout for your streams that you can later
              change. You can also rotate them to let you focus on the stream
              you prefer by accessing the left bar.
            </Text>
          </Box>
          <Heading py="16px" size="sm" textAlign="center" as="h3">
            Check out the top streamers right now!
          </Heading>
          {groups.map((group) => (
            <Link
              href={`https://multistream.gg/${group
                .map((streamer) => streamer.user_login)
                .join("/")}`}
              style={{ textDecoration: "none" }}
            >
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
