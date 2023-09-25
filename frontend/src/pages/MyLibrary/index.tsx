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
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthProvider';
import { useState, useEffect } from 'react';

const MyLibrary = () => {
  const { user } = useAuth();

  const [userStories, setUserStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState({}); // To store the selected story for viewing in the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal

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
      console.log(data);
      setUserStories(data);
    } catch (error) {
      console.error('Error fetching user stories:', error);
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

  useEffect(() => {
    getUserStories();
  }, []);

  return (
    <>
      {userStories.length === 0 ? (
        <Text>No stories available.</Text>
      ) : (
        userStories.map((story, index) => (
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
          {selectedStory && (
            <>
              <ModalHeader>{selectedStory.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold">{selectedStory.title}</Text>
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

export default MyLibrary;
