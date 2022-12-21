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
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingBox } from "../components/loading";
import Link from "next/link";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [value, setValue] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // listen for enter key while typing
  const handleEnter = (event) => {
    if (event.key === "Enter" && value !== "" && !isLoading) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (value !== "" && !isLoading) {
      setIsLoading(true);
      router.push(`/search?query_field=${value}`);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <Center h="100vh" v="100vw">
      {isLoading && <LoadingBox />}
      <Stack minWidth="50vw" align="center">
        <Link href="/" passHref>
          <Heading size="4xl" mb={4}>
            意味物語
          </Heading>
        </Link>
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input
            type="text"
            placeholder="Search"
            value={value}
            onChange={handleChange}
            onKeyPress={handleEnter}
            isDisabled={isLoading}
          />
          <Button
            leftIcon={<SearchIcon />}
            colorScheme="yellow"
            ml={2}
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={isLoading || !value}
          >
            Search
          </Button>
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
