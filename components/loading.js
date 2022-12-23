import { Flex, Heading, Stack, Spinner, HStack, ChakraProvider } from "@chakra-ui/react";

export const LoadingBox = () => {
  // a box that shows a loading animation
  // use only chakra UI components
  return (
    <Flex
      w="100%"
      h="100%"
      position="fixed"
      top="0"
      left="0"
      zIndex="100"
      bg="yellow.300"
      align="center"
      justify="center"
    >
      <Stack align="center" spacing={3}>
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
        <Heading size="md" color="white">
          Loading...
        </Heading>
        <Spinner size="xl" color="white" thickness="5px" />
      </Stack>
    </Flex>
  );
};
