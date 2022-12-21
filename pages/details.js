// make a details page

import { Flex, Heading, HStack, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";

export async function getServerSideProps(context) {
  // get http://localhost:8000/details?uri_field=http://imimonogatari.org/resource/M11
  const { uri_field } = context.query;
  // fetch data from an external API endpoint
  const res = await fetch(
    `http://localhost:8000/details?uri_field=${uri_field}`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default function Details({ data }) {
  // reverse of data.data
  const currentData = data.data.reverse();
  const generalInfo = currentData.reduce((acc, curr) => {
    if (
      curr.property === "http://www.w3.org/2000/01/rdf-schema#comment" ||
      curr.property === "http://www.w3.org/2000/01/rdf-schema#label" ||
      curr.property === "http://imimonogatari.org/property/malPicture"
    ) {
      acc[curr.property] = curr.value;
    }
    return acc;
  }, {});

  const checkIfLink = (value) => {
    return value.includes("http://imimonogatari.org/")
  }

  return (
    <Flex direction="column" w="100%" p="1em">
      <Flex w="100%">
        <Stack mr={4}>
          <Heading>
            {generalInfo["http://www.w3.org/2000/01/rdf-schema#label"]}
          </Heading>
          <Text>
            {generalInfo["http://www.w3.org/2000/01/rdf-schema#comment"]}
          </Text>
        </Stack>
        <Spacer/>
        <Image
          w="200px"
          h="300px"
          src={generalInfo["http://imimonogatari.org/property/malPicture"]}
        />
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((item) => {
              return (
                <Tr>
                  <Td>{item.property}</Td>
                  <Td>{
                    checkIfLink(item.value) ? (
                      <Link href={`/details?uri_field=${item.value}`}>
                        {item.value}
                      </Link>
                    ) : (
                      item.value
                    )
                  }</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
