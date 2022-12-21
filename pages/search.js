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
  const { query_field } = context.query;
  if (query_field === undefined) {
    return {
      props: {
        data: {
          data: [],
        },
        query_field: "",
      },
    };
  }
  // fetch data from an external API endpoint
  const res = await fetch(
    `http://localhost:8000/search?query_field=${query_field}&safe_search=1`
  );
  // Limit the number of results to 50
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data, query_field } };
}

export default function SearchResults({ data, query_field }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [value, setValue] = useState(query_field);
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
            return <WorkCard work={work} />;
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
