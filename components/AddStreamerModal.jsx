import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, Spacer,
  ModalBody, ModalCloseButton, FormControl, Avatar, Button, Input,
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
        <ModalContent>
          <ModalHeader>Search by Twitch Username</ModalHeader>
          <ModalCloseButton mt="8px" mr="8px" />
          <ModalBody>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Neenoh"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Spacer />
            <Button
              w="100%"
              colorScheme="blue"
              onClick={async () => {
                const response = await fetch(`https://api.twitch.tv/helix/search/channels?query=${initialRef.current.value}`, {
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
              Search
            </Button>
          </ModalFooter>
          <Table
            variant="simple"
            borderRadius="18px"
          >
            <Tbody>
              {
                  searchResults.map((result) => (
                    <Tr
                      onClick={() => {
                        setStreamersList([result, ...streamersList]);
                        setSearchResult([]);
                        onClose();
                      }}
                      _hover={{ bg: '#efefef' }}
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
                              fontWeight="semibold"
                              ml="-4px"
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
