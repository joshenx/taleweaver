import {
  Button,
  Box,
  Tag,
  Container,
  Text,
  Modal,
  Heading,
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
  Stack,
  Center,
  Skeleton,
  ModalFooter,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthProvider';
import { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import FlipbookDisplay from '../../App/components/FlipbookDisplay';
import { Story } from '../../App/components/FlipbookDisplay';

const MyLibrary = () => {
  const { user } = useAuth();

  const [userStories, setUserStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story>(); // To store the selected story for viewing in the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(-1);

  const getUserStories = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/${user.id}/get-all-stories`,
      );
      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }
      const data = await response.json();
      setUserStories(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user stories:', error);
    }
  };

  const getStory = async (storyId: number) => {
    const userStory = userStories.find((story) => story.storyid === storyId);
    if (userStory && userStory.story != undefined) {
      setSelectedStory(userStory);
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
      setUserStories((prevUserStories) =>
        prevUserStories.map((prevStory) =>
          prevStory.storyid === storyId
            ? { ...prevStory, story: json_data.story }
            : prevStory,
        ),
      );
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  const handleDeleteStory = async (storyId: number) => {
    setIsDeleting(storyId);
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/${storyId}/delete-story`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }
      // Update the userStories state to reflect the change in public status
      setUserStories((prevStories) =>
        prevStories.filter((story) => story.storyid !== storyId),
      );
    } catch (error) {
      console.error('Error deleting story:', error);
    } finally {
      setIsDeleting(-1);
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

  const handleShareButtonClick = async (storyId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/${storyId}/set-to-public`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }
      // Update the userStories state to reflect the change in private status
      setUserStories((prevStories) =>
        prevStories.map((story) =>
          story.storyid === storyId ? { ...story, ispublic: true } : story,
        ),
      );
    } catch (error) {
      console.error('Error setting to public:', error);
    }
  };

  const handleUnshareButtonClick = async (storyId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/${storyId}/set-to-private`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }
      // Update the userStories state to reflect the change in public status
      setUserStories((prevStories) =>
        prevStories.map((story) =>
          story.storyid === storyId ? { ...story, ispublic: false } : story,
        ),
      );
    } catch (error) {
      console.error('Error setting to private:', error);
    }
  };

  // Filter stories based on the search query
  const filteredStories = userStories.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    getUserStories();
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
          <Box
            key={story.storyid}
            borderWidth="1px"
            borderRadius="5px"
            m="1rem"
            p="4"
          >
            {/* <Image src={story['story'][0].image_url} /> */}
            <Text fontWeight="bold">
              {index + 1}. {story.title}
            </Text>
            <Tag m="3px" size={'sm'} variant="solid" colorScheme="teal">
              {story.moral}
            </Tag>

            <Tag m="3px" size={'sm'} variant="solid" colorScheme="orange">
              {story.genre}
            </Tag>
            <VStack
              flexDirection="row"
              justifyContent="space-between"
              pt="1rem"
            >
              <Button
                variant="styled"
                onClick={() => handleViewStoryClick(story.storyid)}
              >
                View Story
              </Button>
              {!story.ispublic && (
                <Button
                  variant="outline"
                  onClick={() => handleShareButtonClick(story.storyid)}
                >
                  Publish
                </Button>
              )}
              {story.ispublic && (
                <Button
                  _hover={{
                    textDecoration: 'none',
                    color: 'gray.800',
                  }}
                  mx="1rem"
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  onClick={() => handleUnshareButtonClick(story.storyid)}
                >
                  Unpublish
                </Button>
              )}
              <Button
                variant="solid"
                colorScheme='red'
                onClick={() => handleDeleteStory(story.storyid)}
              >
                {
                  isDeleting == story.storyid && <Text as="i">Deleting...</Text>
                }
                {
                  isDeleting != story.storyid && <Text>Delete</Text>
                }
              </Button>
            </VStack>
          </Box>
        ))
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size={'full'}
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedStory?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowX="hidden" overflowY="scroll">
            <style>
              {`
                /* Hide the scrollbar track and thumb */
                ::-webkit-scrollbar {
                  width: 0.5rem; /* Adjust the width as needed */
                }
                ::-webkit-scrollbar-track {
                  background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                  background: transparent;
                }

                /* Hide the scrollbar in Firefox */
                scrollbar-width: none;
              `}
            </style>
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

export default MyLibrary;
