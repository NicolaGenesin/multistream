import React, { useState, useEffect } from "react";
import {
  Icon,
  Box,
  Image,
  Heading,
  HStack,
  Text,
  Spacer,
  VStack,
  Link,
  Wrap,
} from "@chakra-ui/react";

const Main = ({ trendingStreamers }) => (
  <VStack p="16px">
    <Wrap
      boxShadow="dark-lg"
      padding="16px"
      borderRadius="16px"
      borderWidth="2px"
      borderColor="#9147ff22"
      spacing="16px"
      _hover={{
        transform: "scale(1.025)",
      }}
    >
      {trendingStreamers.map((streamer, index) => (
        <VStack bg="#333" borderRadius="8px" spacing="0" key={`${index}`}>
          <Box h={["100%", "110px"]} w={["100%", "270px"]}>
            <Image
              borderRadius="8px 8px 0px 0px"
              boxSize="100%"
              objectFit="cover"
              src={`${streamer.thumbnail_url.replace(
                "{width}x{height}",
                "480x234"
              )}`}
            />
          </Box>
          <HStack pt="8px" pr="4px" w="100%">
            <Spacer />
            <VStack textAlign="right">
              <Text mr="4px" fontWeight="semibold" letterSpacing="wide">
                <Icon
                  viewBox="0 0 200 200"
                  color="green.400"
                  mr="4px"
                  mt="-2px"
                >
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                {streamer.user_name}
              </Text>
            </VStack>
          </HStack>
          <HStack pr="4px" w="100%">
            <Spacer />
            <Text
              maxW="270px"
              mr="4px"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="wide"
              color="#999"
            >
              Streaming {streamer.game_name}
            </Text>
          </HStack>
          <HStack pr="4px" pb="8px" w="100%">
            <Spacer />
            <Text
              mr="4px"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="wide"
              color="#999"
            >
              Viewers: {streamer.viewer_count}
            </Text>
          </HStack>
        </VStack>
      ))}
    </Wrap>
  </VStack>
);

export default Main;
