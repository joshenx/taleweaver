import {
  Button,
  Flex,
  Box,
  Text,
  Modal,
  Container,
  Tag,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Image,
  Stack,
  Skeleton,
  VStack,
  Center,
  Divider,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import FlipbookDisplay from '../../App/components/FlipbookDisplay';
import { Story } from '../../App/components/FlipbookDisplay';

// interface Story {
//   storyid: number;
//   ispublic: boolean;
//   age: number;
//   moral: string;
//   title: string;
//   genre: string;
//   userid: string;
//   story: [];
// }

const PublicLibrary = () => {
  const [publicStories, setPublicStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story>(); // To store the selected story for viewing in the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState<Number[]>([]);

  const onLoad = (storyId: Number) => {
    setIsImageLoaded([...isImageLoaded, storyId]);
  }

  const getPublicStories = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/get-public-stories`);
      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }
      const data = await response.json();
      setPublicStories(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching public stories:', error);
    }
  };

  const getStory = async (storyId: number) => {
    const publicStory = publicStories.find(
      (story) => story.storyid === storyId,
    );
    if (publicStory && publicStory.story != undefined) {
      setSelectedStory(publicStory);
      return;
    }

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
      setSelectedStory(json_data);
      setPublicStories((prevPublicStories) =>
        prevPublicStories.map((prevStory) =>
          prevStory.storyid === storyId
            ? { ...prevStory, story: json_data.story }
            : prevStory,
        ),
      );
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
    await getStory(storyId);
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
    <Container minHeight="100vh">
      <Input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isLoading ? (
        <Stack spacing={5} mt="2rem">
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
        </Stack>
      ) : filteredStories.length === 0 ? (
        <Text>No stories available.</Text>
      ) : (
        filteredStories.map((story, index) => (
          <Flex
            key={story.storyid}
            borderWidth="1px"
            borderRadius="5px"
            m="1rem"
            p="4"
            direction="row"
            justifyContent="space-between"
          >
            {' '}
            <Box>
              <VStack
                flexDirection="row"
                justifyContent="left"
              >
                <Image
                  borderRadius="1rem"
                  boxSize="25%"
                  src={story.coverurl}
                  alt={`Cover image for ${story.title}`}
                  onLoad={() => onLoad(story.storyid)}
                  style={{display: isImageLoaded.includes(story.storyid) ? 'block' : 'none'}}
                />
                {!isImageLoaded.includes(story.storyid) && <Spinner />}

                <HStack
                  flexDirection="column"
                  justifyContent="left"
                  alignItems="left"
                >
                  <Text fontWeight="bold">
                    {index + 1}. {story.title}
                  </Text>

                  <VStack
                    flexDirection="row"
                    justifyContent="left"
                    alignItems="left"
                  >
                    <Tag m="3px" size={'sm'} variant="solid" colorScheme="teal">
                      {story.moral}
                    </Tag>
                    <Tag m="3px" size={'sm'} variant="solid" colorScheme="orange">
                      {story.genre}
                    </Tag>
                  </VStack>

                  <Box>
                    <Button
                      margin="auto"
                      onClick={() => handleViewStoryClick(story.storyid)}
                    >
                      View Story
                    </Button>
                  </Box>
                </HStack>
              </VStack>
            </Box>
          </Flex>
        ))
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} size={'full'}>
        <ModalOverlay />
        <ModalContent maxW="100vw" maxH="100vh" overflow="hidden">
          <ModalHeader>{selectedStory?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Container textAlign="center" maxW={'4xl'} py={12}>
                <FlipbookDisplay selectedStory={selectedStory} />
              </Container>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PublicLibrary;
