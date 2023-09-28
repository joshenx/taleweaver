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

export interface Story {
  storyid: number;
  ispublic: boolean;
  age: number;
  moral: string;
  title: string;
  genre: string;
  userid: string;
  story: {
    image_prompt: string;
    image_url: string;
    page: number;
    subject_description: string;
    text: string;
  }[];
}

const FlipbookDisplay = ({ selectedStory }: { selectedStory: Story }) => {
  if (!selectedStory || !selectedStory.story) {
    return null; // Add a fallback for when the data is not available.
  }

  return (
    <>
      <HTMLFlipBook
        width={400}
        height={600}
        size="stretch"
        minWidth={172}
        maxWidth={700}
        minHeight={218}
        maxHeight={1000}
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
              p="10px"
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
                {/* <Text fontSize="sm" fontStyle="normal">
                  {pageData.image_prompt}
                </Text> */}
                <Text overflow="clip" fontSize="1rem" fontStyle="normal">
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
                opacity="0.1"
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
