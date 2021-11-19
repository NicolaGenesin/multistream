import { Box, Link, SimpleGrid, Image, Stack } from "@chakra-ui/react";
import * as React from "react";
import { FooterHeading } from "./FooterHeading";

export const LinkGrid = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">Resources</FooterHeading>
      <Stack>
        <Link href="https://www.kittr.gg/">
          <Image
            mt="-6px"
            htmlWidth="100px"
            objectFit="fit"
            src="https://www.kittr.gg/media/beta-logo.svg"
          />
        </Link>
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
