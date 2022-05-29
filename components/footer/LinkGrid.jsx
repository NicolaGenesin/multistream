import { Box, Link, SimpleGrid, Image, Stack } from "@chakra-ui/react";
import * as React from "react";
import { FooterHeading } from "./FooterHeading";

export const LinkGrid = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">Resources</FooterHeading>
      <Stack>
        <Link href="https://eft-ammo.com/">Escape From Tarkov Ammo Charts</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Legal</FooterHeading>
      <Stack>
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms-and-conditions">Terms</Link>
      </Stack>
    </Box>
  </SimpleGrid>
);
