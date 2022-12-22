// make a details page
import { useEffect, useState } from "react";
import { Flex, Heading, HStack, VStack, Image, Spacer, Stack, Text, Box, Button, Select } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

import {
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';

import { Grid, GridItem } from '@chakra-ui/react'

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
import { ExternalLinkIcon, UnlockIcon, ChevronRightIcon, DownloadIcon } from '@chakra-ui/icons'

const urlValidator = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
                                'i');
const generalInfoProperties = [
    "http://www.w3.org/2000/01/rdf-schema#comment",
    "http://www.w3.org/2000/01/rdf-schema#label",
    "http://imimonogatari.org/property/malPicture"
];

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
      .replace("http://www.wikidata.org/entity/", "wd:");

const filetypeToMimetype = {
  "rdf": "application/rdf+xml",
  "rdfs": "application/rdf+xml",
  "owl": "application/rdf+xml",
  "xml": "application/rdf+xml",
  "nt": "text/plain",
  "ntx": "application/x-n-triples-RDR",
  "ttl": "application/x-turtle",
  "ttlx": "application/x-turtle-RDR",
  "n3": "text/rdf+n3",
  "trix": "application/trix",
  "trig": "application/x-trig",
  "nq": "text/x-nquads",
  "srj": "application/sparql-results+json, application/json",
  "json": "application/sparql-results+json, application/json",
  "tsv": "text/tab-separated-values",
  "csv": "text/csv"
}

const filetypes = Object.keys(filetypeToMimetype);

export async function getServerSideProps(context) {
  // get http://localhost:8000/details?uri_field=http://imimonogatari.org/resource/M11
  const { uri_field } = context.query;  
  // fetch data from an external API endpoint
  const res = await fetch(
    `http://localhost:8000/details?uri_field=${encodeURIComponent(uri_field)}`
  );
  let props;
  var data = await res.json();
  const rdf_types = data.data
        .filter((curr) => curr.property == "http://www.w3.org/1999/02/22-rdf-syntax-ns#type")
        .map((curr) => curr.value);
  const resource_id = new URL(uri_field).pathname.split('/').filter(Boolean).pop();
  
  if (rdf_types.includes("http://imimonogatari.org/resource/Works")) {
    const wikidata_res = await fetch(
      `http://localhost:8000/wikidata?manga_id=${encodeURIComponent(uri_field)}`
    );
    const wikidata = await wikidata_res.json();
    props = { props : { data: data, wikidata: wikidata }};
  } else {
    props = { props : { data: data } };
  }
  props.props.rdf_types = rdf_types;
  props.props.resource_id = resource_id;
  return props
  // Pass data to the page via props
}

const WikidataDetails = ({ data }) => {
  if (data.data.length != 0) {
    const details = data.data[0];
    return (
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <GridItem>
        
        <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
        <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        Links
      </Box>
        <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
        <List>

        <ListItem>
        <ListIcon as={ChevronRightIcon}/>
        <Link href={details.wikidataURI}> Wikidata {toTurtlePrefix(details.wikidataURI)} <ExternalLinkIcon/> </Link>
        </ListItem>

        <ListItem>
        <ListIcon as={ChevronRightIcon}/>
        <Link href={details.wikipediaLink}> Wikipedia article <ExternalLinkIcon/> </Link>
        </ListItem>

        <ListItem>
        <ListIcon as={ChevronRightIcon}/>
        <Link href={details.mangadexLink}> Read on MangaDex <UnlockIcon/> </Link>
        </ListItem>
        </List>
        </AccordionPanel>
        </AccordionItem>
        </Accordion>

      </GridItem>
        <GridItem>
        <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
        <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        Characters
      </Box>
        <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
        <Accordion defaultIndex={[0]} allowMultiple>
        {details.characters.map(([characterName, wikidataURI, malCharURL]) => (
          <AccordionItem>
          <AccordionButton>
          <Box as="span" flex='1' textAlign='left'>
          {characterName}
          </Box>
            <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
            
          <VStack align='flex-start'>
            <Link href={wikidataURI}> {toTurtlePrefix(wikidataURI)} <ExternalLinkIcon/> </Link>
            <Link href={malCharURL}> {malCharURL} <ExternalLinkIcon/> </Link>
          </VStack>
          </AccordionPanel>
            </AccordionItem>))}
      </Accordion>
        </AccordionPanel>
        </AccordionItem>
        </Accordion>
        </GridItem>
        </Grid>
    )
  } else {
    return null;
  }
}

export default function Details(props) {
  const data = props.data;
  const rdf_types = props.rdf_types;
  if (data.error) console.log(data.error);
  // reverse of data.data
  const allData = data.data?.reverse() ?? [];
  const generalInfo = allData.reduce((acc, curr) => {
      if (generalInfoProperties.includes(curr.property)) {
          acc[curr.property] = curr.value;
      }
      return acc;
  }, {});

  const [filetype, setFiletype] = useState('rdf');

  const handleChange = event => {
    setFiletype(event.target.value);
  };
  
  const downloadHander = (event) => {
    const mimetype = filetypeToMimetype[filetype];
    
    fetch(`http://localhost:8000/resource/${props.resource_id}`, {
      method: 'GET',
      headers: {
        'Accept': mimetype,
      }
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${props.resource_id}.${filetype}`
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
  }
  
  const currentData = allData.filter((curr) => !generalInfoProperties.includes(curr.property));
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
      {rdf_types.includes("http://imimonogatari.org/resource/Works") ?
       <WikidataDetails data={props.wikidata} /> : null}
      <HStack>
      <Button leftIcon={<DownloadIcon/>} onClick={downloadHander}> Get Data </Button>
      <Select placeholder='rdf' onChange={handleChange}>
      {filetypes.map((filetype_) => <option value={filetype_}>{filetype_}</option>)}
    </Select>
      </HStack>
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
