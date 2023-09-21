import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { useState } from 'react';

const CreateStory = () => {
  const numPages = 5;
  const [focus, setFocus] = useState('vocabulary');
  const [vocabAge, setVocabAge] = useState(3);
  const [tabIndex, setTabIndex] = useState(0);
  const [storyPrompt, setStory] = useState('');
  const [name, setName] = useState('');
  const [sliderValue, setSliderValue] = useState(3);
  const additionalPromptInfo = `The story should teach ${focus} appropriate for a ${vocabAge}-year-old.`;
  const {
    isOpen: showAlert,
    onClose: closeAlert,
    onOpen: openAlert,
  } = useDisclosure({ defaultIsOpen: false });
  const {
    isOpen: showSuccess,
    onClose: closeSuccess,
    onOpen: openSuccess,
  } = useDisclosure({ defaultIsOpen: false });

  const handleSubmitDebug = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt, context: '' }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Failed to send message to API');
      }
    } catch (error) {
      console.error('Error sending message to API', error);
    }
  };

  const handleStoryPromptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    let inputValue = e.target.value;
    setStory(inputValue);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setName(inputValue);
  };

  return (
    <Container maxW={'2xl'} py={12}>
      <VStack
        flexGrow="1"
        px={{ base: '2rem', md: '0rem' }}
        alignItems={{ base: 'left' }}
      >
        <Heading size="lg">Weave a story about...</Heading>
        <Textarea
          value={storyPrompt}
          onChange={handleStoryPromptChange}
          variant="filled"
          mt="0.5rem"
          resize="none"
          size="xs"
          placeholder="Type your story here!"
        />
        <Heading size="md">that focuses on...</Heading>
        <Tabs onChange={(index) => setTabIndex(index)} variant="soft-rounded">
          <TabList>
            <Tab>Vocabulary</Tab>
            <Tab>Morals/Values</Tab>
            <Tab>Genre</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Vocabulary Section */}
              <Slider
                aria-label="slider-ex-2"
                id="slider"
                defaultValue={5}
                min={0}
                max={20}
                colorScheme="teal"
                onChange={(v) => setSliderValue(v)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              {sliderValue} year-old
            </TabPanel>
            <TabPanel>
              {/* Morals Section */}
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              {/* Theme Section */}
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Heading size="lg">The main character is</Heading>
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder="Subject's Name (optional)"
          size="xs"
          variant="filled"
        />
        {!showAlert && !showSuccess && (
          <Button fontWeight="normal" m="1rem 0rem" onClick={handleSubmitDebug}>
            Create Story
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default CreateStory;
