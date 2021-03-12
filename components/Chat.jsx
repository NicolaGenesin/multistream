import React, { useState, useEffect } from 'react';
import { TwitchChat } from 'react-twitch-embed';
import {
  Select, Spacer, VStack, HStack, Circle, Icon,
} from '@chakra-ui/react';
import {
  FiEyeOff,
} from 'react-icons/fi';
import OpenChatButton from './OpenChatButton';

const Main = ({ streamersList, chatFlex }) => {
  const [isChatOpen, setChatState] = useState(true);
  const [streamer, setStreamer] = useState(streamersList.length > 0 ? streamersList[0] : null);
  const [twitchChat, setTwitchChat] = useState(<Spacer />);

  useEffect(() => {
    if (document) {
      const chatBox = document.getElementById('chat-box');

      chatBox.style.flex = isChatOpen ? chatFlex : 0;
    }

    if (isChatOpen) {
      setStreamer(streamersList.length > 0 ? streamersList[0] : null);
    }
  }, [isChatOpen]);

  useEffect(() => {
    const createTwitchChat = () => {
      setTwitchChat(<TwitchChat
        width="100%"
        height="100%"
        channel={streamer.broadcaster_login}
        theme="dark"
      />);
    };

    if (streamer) {
      if (window.Twitch) {
        console.log('[window.Twitch - Chat] Mounted');
        createTwitchChat();
      } else {
        const waitMs = 2500;

        setTimeout(() => {
          console.log(`[window.Twitch - Chat] Not mounted, waiting ${waitMs}ms`);
          createTwitchChat();
        }, waitMs);
      }
    }
  }, [streamer]);

  if (!isChatOpen) {
    return (
      <OpenChatButton
        setChatState={setChatState}
      />
    );
  }

  return (
    <VStack
      bg="#333"
      w="100%"
      h="100%"
    >
      {twitchChat}
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
          color="#9147ff"
          onInput={(e) => {
            const streamerLogin = e.target.value;
            const streamer = streamersList.find((streamer) => streamer.broadcaster_login === streamerLogin);

            setStreamer(streamer);
          }}
        >
          {streamersList.map((x, index) => (
            <option
              key={`${index}`}
              value={x.broadcaster_login}
            >
              {x.display_name}
            </option>
          ))}
        </Select>
        <Circle
          _hover={{
            color: '#ffa502',
            transform: 'scale(1.05)',
            'box-shadow': '0 0 8px #888',
          }}
          borderColor="#9147ff"
          borderWidth="2px"
          w={10}
          h={10}
          onClick={() => {
            setChatState(false);
          }}
        >
          <Icon
            as={FiEyeOff}
            color="#fff"
          />
        </Circle>
      </HStack>
    </VStack>
  );
};

export default Main;
