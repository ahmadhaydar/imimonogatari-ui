import {
  Flex,
  Heading,
  Stack,
  Spinner,
  HStack,
  ChakraProvider,
  Spacer,
  Box,
  Center,
} from "@chakra-ui/react";
// set chakraUI font to seriff
export const LoadingBox = ({sfw}) => {
  // use only chakra UI components
  return (
    <>
      {/* play audio in the backgroun */}
      <audio autoPlay loop>
        <source src={sfw? "loading.mp3":"loadingNSFW.mp3"} type="audio/mpeg" />
      </audio>
      <Flex
        w="100vw"
        h="100vh"
        position="fixed"
        top="0"
        left="0"
        zIndex="100"
        bg={sfw ? "yellow.400" : "red.400"}
        align="center"
        justify="center"
        direction="column"
      >
        <Box bg="black" w="100%" h="10vh" />
        <Center flex={1}>
          <Stack align="center" spacing={3} mb={4} flex={1}>
            {sfw? (<HStack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  読
                </Heading>
                <Heading size="sm" color="white">
                  Yo
                </Heading>
              </Stack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  み
                </Heading>
                <Heading size="sm" color="white">
                  Mi
                </Heading>
              </Stack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  込
                </Heading>
                <Heading size="sm" color="white">
                  Ko
                </Heading>
              </Stack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  み
                </Heading>
                <Heading size="sm" color="white">
                  Mi
                </Heading>
              </Stack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  中
                </Heading>
                <Heading size="sm" color="white">
                  Chuu
                </Heading>
              </Stack>
            </HStack>) : 
            // equivallent in 自慰行為中 (jiikoi chu)
            (<HStack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  自
                </Heading>
                <Heading size="sm" color="white">
                  Ji
                </Heading>
              </Stack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  慰
                </Heading>
                <Heading size="sm" color="white">
                  I
                </Heading>
              </Stack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  行
                </Heading>
                <Heading size="sm" color="white">
                  Kou
                </Heading>
              </Stack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  為
                </Heading>
                <Heading size="sm" color="white">
                  I
                </Heading>
              </Stack>
              <Stack align="center">
                <Heading size="2xl" color="white">
                  中
                </Heading>
                <Heading size="sm" color="white">
                  Chuu
                </Heading>
              </Stack>
            </HStack>)
            }
            <Spinner size="8xl" color="white" thickness="5px" />
          </Stack>
        </Center>
        <Box bg="black" w="100%" h="10vh" />
      </Flex>
    </>
  );
};
