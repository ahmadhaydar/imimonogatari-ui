import { Flex, Heading, Stack, Spinner } from "@chakra-ui/react";

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
      bg="rgba(0,0,0,0.5)"
      align="center"
      justify="center"
    >
      <Stack align="center" spacing={3}>
        <Spinner size="xl" color="white" thickness="5px"/>
        <Heading size="lg" color="white">
          Loading...
        </Heading>
      </Stack>
    </Flex>
  );
};
