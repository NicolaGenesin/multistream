import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, Avatar, Button, Input,
  Table, Tbody, Box, Tr, HStack, Td, Icon, Text,
} from '@chakra-ui/react';

const Main = ({
  isOpen, onOpen, onClose, setStreamersList, streamersList,
}) => {
  const initialRef = React.useRef();
  const [searchResults, setSearchResult] = useState([]);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          bg="#5d5d6e"
          color="white"
          borderRadius="sm"
          p="16px"
        >
          {/* <ModalHeader>Search by Twitch username</ModalHeader> */}
          {/* <ModalCloseButton mt="8px" mr="8px" /> */}
          {/* <ModalBody> */}
          {/* <FormControl> */}
          <Input
            mb="16px"
            bg="white"
            color="#333"
            _focus={{ borderColor: '#9147ff' }}
            ref={initialRef}
            placeholder="Twitch username"
          />
          {/* </FormControl> */}
          {/* </ModalBody> */}
          {/* <ModalFooter> */}
          <Button
            w="100%"
            color="#9147ff"
            onClick={async () => {
              const query = initialRef.current.value;

              if (!query) { return; }

              const response = await fetch(`https://api.twitch.tv/helix/search/channels?query=${query}`, {
                method: 'GET',
                headers: {
                  'client-id': 'oc2v6nbh3v12i5i5x8et8bo7amnu9o',
                  Authorization: 'Bearer ' + '0joge0i8si4qv6eifd9weoztm510cn',
                },
              });

              const result = await response.json();

              setSearchResult(result.data);
            }}
          >
            Search by Twitch username
          </Button>
          {/* </ModalFooter> */}
          <Table
            mt={searchResults.length === 0 ? '0px' : '16px'}
            variant="simple"
            borderRadius="18px"
          >
            <Tbody>
              {
                  searchResults.map((result, index) => (
                    <Tr
                      key={`${index}`}
                      onClick={() => {
                        setStreamersList([result, ...streamersList]);
                        setSearchResult([]);
                        onClose();
                      }}
                      _hover={{ bg: '#444450' }}
                    >
                      <Td>
                        <HStack>
                          <Box
                            mr="4px"
                          >
                            <Avatar
                              size="sm"
                              boxShadow="lg"
                              name={result.display_name}
                              src={result.thumbnail_url}
                            />
                          </Box>
                          <Box
                            letterSpacing="wide"
                            fontSize="sm"
                            fontWeight="semibold"
                          >
                            { result.display_name }
                          </Box>
                        </HStack>
                      </Td>
                      <Td>
                        <HStack>
                          <Box>
                            <Icon
                              viewBox="0 0 200 200"
                              color={result.is_live ? 'green.400' : 'red.400'}
                            >
                              <path
                                fill="currentColor"
                                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                              />
                            </Icon>
                          </Box>
                          <Box>
                            <Text
                              mt="4px"
                              ml="-4px"
                              letterSpacing="wide"
                              fontWeight="semibold"
                              fontSize="xs"
                            >
                              { result.is_live ? 'STREAMING' : 'OFFLINE' }
                            </Text>
                          </Box>
                        </HStack>
                      </Td>
                    </Tr>
                  ))
              }
            </Tbody>
          </Table>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Main;
