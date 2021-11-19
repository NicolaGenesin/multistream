import {
  Button,
  chakra,
  HTMLChakraProps,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FooterHeading } from "./FooterHeading";

export const SubscribeForm = (props) => (
  <chakra.form {...props} onSubmit={(e) => e.preventDefault()}>
    <Stack spacing="4">
      <FooterHeading>Subscribe to my newsletter</FooterHeading>
      <Text>
        Get notified when I'll add new stuff or have exciting news for you.
      </Text>
      <Stack spacing="4" direction={{ base: "column", md: "row" }}>
        <Input
          bg={useColorModeValue("white", "inherit")}
          placeholder="Enter your email"
          type="email"
          color="gray.700"
          required
          focusBorderColor={useColorModeValue("blue.500", "blue.300")}
          _placeholder={{
            opacity: 1,
            color: useColorModeValue("gray.500", "whiteAlpha.700"),
          }}
        />
        <Button
          type="submit"
          colorScheme="blue"
          flexShrink={0}
          width={{ base: "full", md: "auto" }}
        >
          Subscribe
        </Button>
      </Stack>
    </Stack>
  </chakra.form>
);
