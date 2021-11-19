import { ButtonGroup, ButtonGroupProps, IconButton } from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaReddit, FaTwitter, FaDiscord } from "react-icons/fa";

export const SocialMediaLinks = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="https://discordapp.com/users/156165203619348480"
      aria-label="Discord"
      icon={<FaDiscord fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://twitter.com/NicolaGenesin"
      aria-label="Twitter"
      icon={<FaTwitter fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://github.com/NicolaGenesin"
      aria-label="GitHub"
      icon={<FaGithub fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://www.reddit.com/message/compose/?to=1911z"
      aria-label="Reddit"
      icon={<FaReddit fontSize="20px" />}
    />
  </ButtonGroup>
);
