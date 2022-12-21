// create a chakra UI card containing a search result
// {
//     "s": "http://imimonogatari.org/resource/M11",
//     "label": "Naruto",
//     "thumbnail": "https://cdn.myanimelist.net/images/manga/3/249658l.jpg",
//     "publisherLabel": "Shounen Jump (Weekly)",
//     "rel": "4.96875",
//     "genres": "Action, Adventure, Fantasy, MartialArts, Shounen",
//     "authors": "Masashi Kishimoto"
//   }

import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Link from 'next/link';

export const WorkCard = ({ work }) => {
  // a card with thumbnail as backkground, when hovered, it shows the label genres and authors while dimming the background image
  // use only chakra UI components
  return (
    <Link href={`/details?uri_field=${work.s}`}>
      <Box
        h="265px"
        backgroundImage={`url(${work.thumbnail})`}
        backgroundSize="cover"
        borderRadius="2xl"
        bgColor="gray.200"
        shadow="lg"
        overflow="hidden"
      >
        <Flex
          direction="column"
          w="100%"
          h="100%"
          p="1em"
          // make invisible when not hovered
          opacity="0"
          _hover={{
            bgColor: "rgba(0,0,0,0.7)",
            transition: "0.25s",
            backdropFilter: "blur(2px)",
            opacity: "1",
          }}
        >
          <Heading size="md" color="white">
            {work.label}
          </Heading>
          <Heading size="sm" color="white">
            {work.authors}
          </Heading>
          <Text size="sm" color="white">
            {work.publisherLabel}
          </Text>
          <Spacer />
          <Text color="white">{work.genres}</Text>
        </Flex>
      </Box>
    </Link>
  );
};
