import React, { useState, useEffect } from "react";
import { TwitchChat } from "react-twitch-embed";
import {
  Select,
  Spacer,
  VStack,
  HStack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";
import OpenChatButton from "./OpenChatButton";

const Main = ({ streamersList, chatFlex }) => {
  const [isChatOpen, setChatState] = useState(true);
  const [streamer, setStreamer] = useState(
    streamersList.length > 0 ? streamersList[0] : null
  );
  const [twitchChats, setTwitchChats] = useState([<Spacer />]);

  useEffect(() => {
    if (streamersList.length > 0) {
      setStreamer(streamersList[0]);
    }
  }, [streamersList]);

  useEffect(() => {
    if (document) {
      const chatBox = document.getElementById("chat-box");

      chatBox.style.flex = isChatOpen ? chatFlex : 0;
    }

    if (isChatOpen) {
      setStreamer(streamersList > 0 ? streamersList[0] : null);
    }
  }, [isChatOpen]);

  useEffect(() => {
    const createTwitchChats = () => {
      const chats = streamersList.map((streamer) => [
        streamer.broadcaster_login,
        <TwitchChat
          width="100%"
          height="100%"
          channel={streamer.broadcaster_login}
          theme="dark"
        />,
      ]);

      setTwitchChats(chats);
    };

    if (streamer) {
      if (window.Twitch) {
        console.log("[window.Twitch - Chat] Mounted");
        createTwitchChats();
      } else {
        const waitMs = 2500;

        setTimeout(() => {
          console.log(
            `[window.Twitch - Chat] Not mounted, waiting ${waitMs}ms`
          );
          createTwitchChats();
        }, waitMs);
      }
    }
  }, [streamersList.length]);

  if (!isChatOpen) {
    return (
      <VStack p="8px" h="100vh" bgGradient="linear(to-t, #9147ff55, #333)">
        <OpenChatButton setChatState={setChatState} />
      </VStack>
    );
  }

  return (
    <VStack bg="#18181b" w="100%" h="100%">
      <VStack w="100%" pt="8px" pl="8px" pr="8px">
        <HStack mt="8px" w="100%">
          <Text
            fontSize="15px"
            fontWeight="600"
            fontFamily="Inter,Roobert,Helvetica Neue,Helvetica,Arial,sans-serif"
            color="#dedee3"
            w="100%"
          >
            SELECT CHAT
          </Text>
          <Button
            _hover={{ bg: "#772ce7" }}
            onClick={() => {
              setChatState(false);
            }}
            size="xs"
            pl="12px"
            pr="12px"
            fontWeight="bolder"
            fontFamily="Inter,Roobert,Helvetica Neue,Helvetica,Arial,sans-serif"
            bg="#9147fe"
            icon={<IoCloseOutline />}
            color="#fff"
          >
            Close
          </Button>
        </HStack>
        <Select
          size="md"
          letterSpacing="wide"
          fontWeight="900"
          fontSize="15px"
          bg="#ffffff33"
          borderColor="#555"
          color="#ddd"
          onInput={(e) => {
            const streamerLogin = e.target.value;
            const streamer = streamersList.find(
              (streamer) => streamer.broadcaster_login === streamerLogin
            );

            setStreamer(streamer);
          }}
        >
          {streamersList.map((x, index) => (
            <option
              style={{
                fontSize: "16px",
                background: "#444",
                color: "#ddd",
              }}
              key={`${index}`}
              value={x.broadcaster_login}
            >
              {x.display_name}
            </option>
          ))}
        </Select>
      </VStack>
      {twitchChats.map((twitchChat) => (
        <Box
          w="100%"
          h="100%"
          hidden={!(streamer && twitchChat[0] === streamer.broadcaster_login)}
        >
          {twitchChat[1]}
        </Box>
      ))}
    </VStack>
  );
};

export default Main;
