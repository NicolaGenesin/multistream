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
import { Copyright } from "./Copyright";
import { LinkGrid } from "./LinkGrid";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { SubscribeForm } from "./SubscribeForm";

const Main = () => (
  <Box bg="gray.700">
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="8xl"
      py="12"
      px={{ base: "4", md: "8" }}
      mt="5%"
    >
      <Stack spacing="10" divider={<StackDivider />}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: "10", lg: "28" }}
        >
          <Box flex="1">{/* <Logo /> */}</Box>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "10", md: "20" }}
          >
            <LinkGrid spacing={{ base: "10", md: "20", lg: "28" }} flex="1" />
            <SubscribeForm width={{ base: "full", md: "sm" }} />
          </Stack>
        </Stack>
        Í
        <Stack
          direction={{ base: "column-reverse", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Copyright />
          <SocialMediaLinks />
        </Stack>
      </Stack>
    </Box>
  </Box>
);

export default Main;
