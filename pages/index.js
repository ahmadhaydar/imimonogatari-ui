import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import {
  Center,
  InputGroup,
  Input,
  InputLeftElement,
  Stack,
  useColorMode,
  IconButton,
  Heading,
  Box,
} from "@chakra-ui/react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Center h="100vh" v="100vw">
      <Stack minWidth="50vw" align="center">
        <Heading size="4xl" mb={3}>
          意味物語
        </Heading>
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input type="text" placeholder="Search" />
          <IconButton
            ml={2}
            colorScheme="yellow"
            aria-label="Search database"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </InputGroup>
      </Stack>
    </Center>
  );
}
