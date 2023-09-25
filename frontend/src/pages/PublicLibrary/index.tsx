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
  ModalFooter,
  Input,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface Story {
  storyid: number;
  ispublic: boolean;
  age: number;
  moral: string;
  title: string;
  genre: string;
  userid: string;
}

const PublicLibrary = () => {
  const [publicStories, setPublicStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story>(); // To store the selected story for viewing in the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  const getPublicStories = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/get-public-stories`);
      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }
      const data = await response.json();
      setPublicStories(data);
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
      console.log(data);
      console.log(data.title);
      setSelectedStory(data);
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
    <>
      <Input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredStories.length === 0 ? (
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedStory?.title}</ModalHeader>
          <ModalCloseButton />
          {selectedStory && (
            <>
              <ModalBody>
                <Text>{selectedStory}</Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={closeModal}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PublicLibrary;
