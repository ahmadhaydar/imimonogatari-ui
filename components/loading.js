import { Flex, Heading, Stack, Spinner, HStack, ChakraProvider, Spacer, Box, Center } from "@chakra-ui/react";
// set chakraUI font to seriff
export const LoadingBox = () => {
  // a box that shows a loading animation
  // use only chakra UI components
  return (
    <Flex
      w="100vw"
      h="100vh"
      position="fixed"
      top="0"
      left="0"
      zIndex="100"
      bg="yellow.400"
      align="center"
      justify="center"
      direction="column"
    >
      <Box bg="black" w="100%" h="10vh"/>
      <Center flex={1}>
      <Stack align="center" spacing={3} mb={4}>
        <HStack>
          <Stack align="center">
            <Heading size="xl" color="white">
              読
            </Heading>
            <Heading size="sm" color="white">
              Yo
            </Heading>
          </Stack>
          <Stack align="center">
            <Heading size="xl" color="white">
            み
            </Heading>
            <Heading size="sm" color="white">
              Mi
            </Heading>
          </Stack>
          <Stack align="center">
            <Heading size="xl" color="white">
            込
            </Heading>
            <Heading size="sm" color="white">
              Ko
            </Heading>
          </Stack>
          <Stack align="center">
            <Heading size="xl" color="white">
            み
            </Heading>
            <Heading size="sm" color="white">
              Mi
            </Heading>
          </Stack>
          <Stack align="center">
            <Heading size="xl" color="white">
            中
            </Heading>
            <Heading size="sm" color="white">
              Chuu
            </Heading>
          </Stack>
        </HStack>
        <Spinner size="xl" color="white" thickness="5px" />
      </Stack>
      </Center>
      <Box bg="black" w="100%" h="10vh"/>
    </Flex>
  );
};
