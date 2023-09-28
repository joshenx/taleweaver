import {
  Button,
  Box,
  Tag,
  Container,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  HStack,
  Image,
  VStack,
  Divider,
  Spinner,
  Center,
  SkeletonText,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';

interface Story {
  storyid: number;
  ispublic: boolean;
  age: number;
  moral: string;
  title: string;
  genre: string;
  userid: string;
  story: [];
}

const FlipbookDisplay = ({ selectedStory }: { selectedStory: Story }) => {
  console.log(selectedStory);
  if (!selectedStory || !selectedStory.story) {
    return null; // Add a fallback for when the data is not available.
  }

  return (
    <>
      <HTMLFlipBook
        width={300}
        height={450}
        size="stretch"
        minWidth={172}
        maxWidth={545}
        minHeight={218}
        maxHeight={837}
        maxShadowOpacity={0.5}
        showCover={false}
        mobileScrollSupport={true}
        className="demo-book"
      >
        {selectedStory &&
          selectedStory.story &&
          selectedStory.story.map((pageData) => (
            <Box
              key={pageData.page}
              p="2rem"
              bg="white"
              border="1px"
              borderColor="gray.300"
              borderRadius="10px"
              overflow="clip"
            >
              <VStack key={pageData.page} maxHeight="100%">
                <Image
                  objectFit="cover"
                  borderRadius="1rem"
                  boxSize="100%"
                  src={pageData.image_url}
                  alt={pageData.image_prompt}
                />
                <Text fontSize="sm" fontStyle="normal">
                  {pageData.image_prompt}
                </Text>
                <Text fontSize="lg" fontStyle="normal">
                  {pageData.text}
                </Text>
                <Box position="absolute" bottom="1rem">
                  <Divider />
                  <Text fontSize="sm" fontStyle="normal">
                    {pageData.page}
                  </Text>
                </Box>
              </VStack>
              <Box
                backgroundImage={pageData.image_url}
                backgroundSize="cover"
                filter="blur(5px)"
                border="1px"
                borderColor="gray.300"
                borderRadius="10px"
                position="absolute"
                top="0"
                left="0"
                zIndex="-1"
                opacity="0.2"
                bgPosition="center"
                width="100%"
                height="100%"
              />
            </Box>
          ))}
      </HTMLFlipBook>
    </>
  );
};

export default FlipbookDisplay;
