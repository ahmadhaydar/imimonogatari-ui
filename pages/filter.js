import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputLeftElement,
  useColorMode,
  IconButton,
  Heading,
  Flex,
  Stack,
  Grid,
  Button,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingBox } from "../components/loading";
import { WorkCard } from "../components/work";
import Link from "next/link";

export async function getServerSideProps(context) {
  // get http://localhost:8000/search?query_field=Naruto
  const { title, genre, author, publisher, offset, sfw } = context.query;
  if (title === undefined || genre === undefined || author === undefined ||
      publisher === undefined || offset === undefined || sfw === undefined) {
    return {
      props: {
        data: {
          data: [],
        },
        message: "There's an undefined field in the query.",
      },
    };
  }
  // fetch data from an external API endpoint
  let url = `http://127.0.0.1:8000/search/filter?`;
  if (title) {
    url = url + `search_title=${title}&`
  }
  if (publisher) {
    url = url + `search_publisher=${publisher}&`
  }
  const genres = genre.split(',')
  if (genre) {
    for (let i = 0; i < genres.length; i++) {
        url = url + `search_genre=${genres[i]}&`
      }
  }
  const authors = author.split(',')
  if (author) {
    for (let i = 0; i < authors.length; i++) {
        url = url + `search_author=${authors[i]}&`
      }
  }
  url = url + `offset=${offset}&safe_search=${sfw}`

  const res = await fetch(
    url
  );
  // Limit the number of results to 50
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default function SearchResults({ data }) {
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
  }, [data]);

  return (
    <Flex w="100vw" h="100vh" direction="column">
      {isLoading && <LoadingBox />}
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        w="100%"
        align="baseline"
        p="1em"
        bgColor="background"
        borderBottom={colorMode === "light" ? "1px" : "0px"}
        borderColor="gray.200"
      >
        <Link href="/" passHref>
          <Heading size="4xl" mr={4}>
            意味物語
          </Heading>
        </Link>
        <InputGroup flex={1}>
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
            variant="ghost"
            colorScheme="yellow"
            aria-label="Search database"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </InputGroup>
      </Stack>
      <Grid
        // give a comfortable grid layout to the search results
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={6}
        p="1em"
        // make grid not overflow
        overflow="auto"
      >
        {
          // map the data to a list of WorkCard components
          data.data.map((work) => {
            return <WorkCard work={work} setLoading={setIsLoading}/>;
          })
        }
      </Grid>
      {/* if data.data is empty, return error message */}
      {data.data.length === 0 && (
        <Center>
          <Heading size="lg">No results found</Heading>
        </Center>
      )}
    </Flex>
  );
}