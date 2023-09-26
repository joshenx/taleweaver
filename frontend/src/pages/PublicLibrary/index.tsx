import {
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Image,
  Spinner,
  VStack,
  Center,
  Divider,
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

const PublicLibrary = () => {
  const [publicStories, setPublicStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story>(); // To store the selected story for viewing in the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [isLoading, setIsLoading] = useState(true);

  const getPublicStories = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/get-public-stories`);
      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        data[i].story = await getStory(data[i].storyid);
      }
      setPublicStories(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching public stories:', error);
    }
  };

  const getStory = async (storyId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/${storyId}/get-story`,
      );
      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }
      const data = await response.json();
      const json_data = JSON.parse(data);
      return json_data.story;
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewStoryClick = async (storyId: number) => {
    setSelectedStory(publicStories.find((story) => story.storyid === storyId));
    openModal();
  };

  // Filter stories based on the search query
  const filteredStories = publicStories.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    getPublicStories();
  }, []);

  return (
    <>
      <Input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isLoading ? (
        <Spinner size="xl" color="teal.500" />
      ) : filteredStories.length === 0 ? (
        <Text>No stories available.</Text>
      ) : (
        filteredStories.map((story, index) => (
          <Box key={story.storyid} borderWidth="1px" p="4">
            <Text fontWeight="bold">
              {index + 1}. {story.title}
            </Text>
            <Text>{story.moral}</Text>
            <Text>{story.genre}</Text>
            <Button onClick={() => handleViewStoryClick(story.storyid)}>
              View Story
            </Button>
          </Box>
        ))
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} size={'full'}>
        <ModalOverlay />
        <ModalContent maxW="100vw" maxH="100vh" overflow="hidden">
          <ModalHeader>{selectedStory?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
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
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PublicLibrary;
