import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import {
  Center,
  InputGroup,
  Input,
  InputLeftAddon,
  Stack,
  HStack,
  useColorMode,
  IconButton,
  Heading,
  Button,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingBox } from "../components/loading";
import Link from "next/link";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [value, setValue] = useState("");
  const [valueTitle, setValueTitle] = useState("");
  const [valueGenre, setValueGenre] = useState("");
  const [valueAuthor, setValueAuthor] = useState("");
  const [valuePublisher, setValuePublisher] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [googleMode, setGoogleMode] = useState(true);
  // listen for enter key while typing
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (googleMode && value !== "" && !isLoading) {
      setIsLoading(true);
      router.push(`/search?query_field=${value}`);
    }
    if (
      !googleMode &&
      (valueTitle !== "" ||
        valueGenre !== "" ||
        valueAuthor !== "" ||
        valuePublisher !== "") &&
      !isLoading
    ) {
      setIsLoading(true);
      router.push(
        `/filter?title=${valueTitle}&genre=${valueGenre}&author=${valueAuthor}&publisher=${valuePublisher}&offset=0&sfw=1`
      );
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChangeTitle = (event) => {
    setValueTitle(event.target.value);
  };
  const handleChangeGenre = (event) => {
    setValueGenre(event.target.value);
  };
  const handleChangeAuthor = (event) => {
    setValueAuthor(event.target.value);
  };
  const handleChangePublisher = (event) => {
    setValuePublisher(event.target.value);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <Center h="100vh" v="100vw">
      {isLoading && <LoadingBox />}
      <Stack minWidth="80vw" align="center">
        <Link href="/" passHref>
          <Heading size="4xl" mb={4}>
            意味物語
          </Heading>
        </Link>
        <HStack spacing={4} mb={4}>
          <Text>
            Advanced Search :{" "}
            <Switch
              ml={2}
              onChange={() => setGoogleMode(!googleMode)}
              colorScheme="yellow"
              isChecked={!googleMode}
            />
          </Text>
        </HStack>
        <Stack
          direction={{
            base: "column",
            md: "row",
          }}
          align="center"
          spacing={2}
          w="100%"
        >
          {googleMode ? (
            <>
              <Input
                type="text"
                placeholder="Search"
                value={value}
                onChange={handleChange}
                onKeyPress={handleEnter}
                isDisabled={isLoading}
              />
              <HStack spacing={2}>
                <Button
                  rightIcon={<SearchIcon />}
                  colorScheme="yellow"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  isDisabled={isLoading || !value}
                >
                  Search
                </Button>
                <IconButton
                variant="ghost"
                  colorScheme="yellow"
                  aria-label="Search database"
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                />
              </HStack>
            </>
          ) : (
            <>
              <Stack w="100%" align="center" spacing={4}>
                <InputGroup>
                  <InputLeftAddon children="Title:" w="105px" />
                  <Input
                    type="text"
                    placeholder="Ex: horimiya"
                    value={valueTitle}
                    onChange={handleChangeTitle}
                    onKeyPress={handleEnter}
                    isDisabled={isLoading}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Genre:" w="105px" />
                  <Input
                    type="text"
                    placeholder="Ex: comedy,romance,..."
                    value={valueGenre}
                    onChange={handleChangeGenre}
                    onKeyPress={handleEnter}
                    isDisabled={isLoading}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Author:" w="105px" />
                  <Input
                    type="text"
                    placeholder="Ex: hagiwara,hero,..."
                    value={valueAuthor}
                    onChange={handleChangeAuthor}
                    onKeyPress={handleEnter}
                    isDisabled={isLoading}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Publisher:" w="105px" />
                  <Input
                    type="text"
                    placeholder="Ex: shounen jump"
                    value={valuePublisher}
                    onChange={handleChangePublisher}
                    onKeyPress={handleEnter}
                    isDisabled={isLoading}
                  />
                </InputGroup>
                <HStack>
                  <Button
                    rightIcon={<SearchIcon />}
                    colorScheme="yellow"
                    ml={2}
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    isDisabled={
                      isLoading ||
                      (!valueTitle &&
                        !valueGenre &&
                        !valueAuthor &&
                        !valuePublisher)
                    }
                  >
                    Search
                  </Button>
                  <IconButton
                    ml={2}
                    variant="ghost"
                    colorScheme="yellow"
                    aria-label="Search database"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                  />
                </HStack>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </Center>
  );
}
