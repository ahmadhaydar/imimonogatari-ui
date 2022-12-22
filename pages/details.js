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
import { ExternalLinkIcon } from '@chakra-ui/icons'

const urlValidator = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
                                'i');
const generalInfoProperties = [
    "http://www.w3.org/2000/01/rdf-schema#comment",
    "http://www.w3.org/2000/01/rdf-schema#label",
    "http://imimonogatari.org/property/malPicture"
];

export async function getServerSideProps(context) {
  // get http://localhost:8000/details?uri_field=http://imimonogatari.org/resource/M11
  const { uri_field } = context.query;  
  // fetch data from an external API endpoint
  const res = await fetch(
    `http://localhost:8000/details?uri_field=${encodeURIComponent(uri_field)}`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default function Details({ data }) {
  if (data.error) console.log(data.error);
  // reverse of data.data
  const allData = data.data?.reverse() ?? [];
  const generalInfo = allData.reduce((acc, curr) => {
      if (generalInfoProperties.includes(curr.property)) {
          acc[curr.property] = curr.value;
      }
      return acc;
  }, {});
  const currentData = allData.filter((curr) => !generalInfoProperties.includes(curr.property));
  const checkIfDomainLink = (value) => {
      return value.includes("http://imimonogatari.org/");
  }
  const checkIfGenericLink = (value) => {
      return value.length < 2083 && urlValidator.test(value);
  }

  const toTurtlePrefix = (link) => link
        .replace("http://imimonogatari.org/property/", "imip:")
        .replace("http://imimonogatari.org/resource/", "imir:")
        .replace("http://www.w3.org/1999/02/22-rdf-syntax-ns#", "rdf:")
        .replace("http://www.w3.org/2000/01/rdf-schema#", "rdfs:")
        .replace("http://www.w3.org/2002/07/owl#", "owl:")
        .replace("http://www.w3.org/XML/1998/namespace", "xml:")
        .replace("http://www.w3.org/2001/XMLSchema#", "xsd:")
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
          
      {generalInfo["http://imimonogatari.org/property/malPicture"] ?
       (<Image
        w="200px"
        h="300px"
        src={generalInfo["http://imimonogatari.org/property/malPicture"]}
        />):null}
      </Flex>
          <TableContainer whiteSpace="normal">
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
                   <Td>{toTurtlePrefix(item.property)}</Td>
                      <Td>{
                    checkIfDomainLink(item.value) ? (
                            <Link href={`/details?uri_field=${encodeURIComponent(item.value)}`}>
                            {toTurtlePrefix(item.value)}
                            <ExternalLinkIcon/>
                            </Link>
                    ) : (checkIfGenericLink(item.value) ? (
                            <Link href={item.value}>
                            {toTurtlePrefix(item.value)}
                            <ExternalLinkIcon/>
                            </Link>
                    ) : (
                        toTurtlePrefix(item.value)
                    ))
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
