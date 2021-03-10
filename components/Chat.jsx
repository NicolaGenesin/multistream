import React, { useState, useEffect } from 'react';
import { useTimeout } from 'react-use';
import { TwitchChat } from 'react-twitch-embed';
import {
  Select, Spacer, VStack, IconButton, HStack, Text,
} from '@chakra-ui/react';
import {
  FiEyeOff,
} from 'react-icons/fi';
import OpenChatButton from './OpenChatButton';

const Main = ({ streamersList, chatFlex }) => {
  const [isChatOpen, setChatState] = useState(true);
  const [streamer, setStreamer] = useState(streamersList.length > 0 ? streamersList[0] : null);
  const [isReady, cancel] = useTimeout(1500);

  useEffect(() => {
    if (document) {
      const chatBox = document.getElementById('chat-box');

      chatBox.style.flex = isChatOpen ? chatFlex : 0;
    }

    if (isChatOpen) {
      setStreamer(streamersList.length > 0 ? streamersList[0] : null);
    }
  }, [isChatOpen]);

  if (!isChatOpen) {
    return <OpenChatButton setChatState={setChatState} />;
  }

  return (
    <VStack
      bg="#333"
      w="100%"
      h="100%"
    >
      {streamer && isReady() && <TwitchChat width="100%" height="100%" channel={streamer.broadcaster_login} theme="dark" />}
      {(!streamer || !isReady()) && <Spacer />}
      <HStack
        w="100%"
        pb="8px"
        pl="8px"
        pr="8px"
      >
        <Select
          letterSpacing="wide"
          fontWeight="semibold"
          bg="white"
          color="#772ce8"
          onInput={(e) => {
            const streamerLogin = e.target.value;
            const streamer = streamersList.find((streamer) => streamer.broadcaster_login === streamerLogin);

            setStreamer(streamer);
          }}
        >
          {streamersList.map((x) => (
            <option
              value={x.broadcaster_login}
            >
              {x.display_name}
            </option>
          ))}
        </Select>
        <Spacer />
        <IconButton
          onClick={() => {
            setChatState(false);
          }}
          aria-label="Close Chat"
          color="#772ce8"
          icon={<FiEyeOff />}
        />
      </HStack>
    </VStack>
  );
};

export default Main;
