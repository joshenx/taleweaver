import {
  ScaleFade,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  Button,
  Box,
  Container,
  Divider,
  Heading,
  Input,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  Textarea,
  Spinner,
  useDisclosure,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { useState } from 'react';

const CreateStory = () => {
  const numPages = 1;
  const [focus, setFocus] = useState('vocabulary');
  const [vocabAge, setVocabAge] = useState(3);
  const [tabIndex, setTabIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [response, setResponse] = useState({});
  const [storyPrompt, setStory] = useState('');
  const [name, setName] = useState('');
  const additionalPromptInfo = `The story should teach ${focus} appropriate for a ${vocabAge}-year-old.`;
  const additionalNameInfo =
    name === ''
      ? 'The main character can be any name.'
      : `The main character's name is ${name}.`;
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

  const getFullPrompt = () => {
    return `Generate a children's story about ${storyPrompt}. The story should have ${numPages} pages. For each page,
      include an image prompt that is specific, colourful and creative and
      matches the story of the page content. Any names in the "image_prompt" should be replaced with a description of the
      subject. ${additionalPromptInfo} ${additionalNameInfo}
      Format it in json format, like this example:
      {
      "title": "Creative Story Title Here",
      "focus": "${focus}",
      "vocabulary_age": "${vocabAge}",
      "total_pages": "${numPages}",
      "story": {
        ["page": 1,
        "text": "First page of the story text goes here",
        "image_prompt": "A subject(s) doing an activity at a place"],
      ...
      }}`;
  };

  const handleSubmitDebug = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: storyPrompt, context: '' }),
      });

      if (response.ok) {
        const story = await response.json();
        console.log(story);
        openSuccess();
        try {
          setResponse(JSON.parse(story));
        } catch (error) {
          console.error('Error parsing story', error);
          setErrorMsg('Error parsing story');
          openAlert();
        }
      } else {
        console.error('Failed to send message to API');
      }
    } catch (error) {
      console.error('Error sending message to API', error);
    }
  };

  const handleSubmit = async () => {
    const fullPrompt = getFullPrompt();
    console.log(`Submitting prompt: ${fullPrompt}`);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/actual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: fullPrompt, context: '' }),
      });

      if (response.ok) {
        const story = await response.json();
        console.log(`Success! Story: ${story}`);
        try {
          setResponse(JSON.parse(story));
        } catch (error) {
          console.error('Error parsing story', error);
          setErrorMsg('Error parsing story');
          openAlert();
        }
      } else {
        console.error('Failed to send message to API');
      }
    } catch (error) {
      console.error('Error sending message to API', error);
    } finally {
      setIsLoading(false);
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
    <>
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
                  onChange={(v) => setVocabAge(v)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                {vocabAge} year-old
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
            <Button
              background="brand.red"
              color="white"
              fontWeight="normal"
              m="1rem 0rem"
              _hover={{ background: '#E86580' }}
              onClick={handleSubmit} // handleSubmitDebug for testing, handleSubmit for actual API call
            >
              Get Story
            </Button>
          )}
          <Box alignItems="center">
            {isLoading && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
          </Box>
        </VStack>

        {showAlert && (
          <ScaleFade initialScale={0.9} in={showAlert}>
            <Alert mt="1rem" borderRadius="10px" status="error" variant="solid">
              <AlertIcon />
              <AlertDescription fontSize="sm">{errorMsg}</AlertDescription>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={'50%'}
                onClick={closeAlert}
              />
            </Alert>
          </ScaleFade>
        )}
        {showSuccess && (
          <ScaleFade initialScale={0.9} in={showSuccess}>
            <Alert
              mt="1rem"
              borderRadius="10px"
              status="success"
              variant="solid"
            >
              <AlertIcon />
              <AlertDescription fontSize="sm">
                Submission success!
              </AlertDescription>
              <CloseButton
                textAlign="center"
                alignSelf="flex-start"
                position="relative"
                right={-1}
                onClick={closeSuccess}
              />
            </Alert>
          </ScaleFade>
        )}
      </Container>
      <Container textAlign="center" maxW={'4xl'} py={12}>
        <Heading letterSpacing="0.2rem" color="#252A33" as="h1" size="3xl">
          {response?.title}
        </Heading>
        <VStack
          spacing="7"
          pt="2rem"
          px={{ base: '1rem', md: '1rem' }}
          alignItems={{ base: 'center' }}
          textAlign="center"
        >
          {response &&
            response.story &&
            response.story.map((pageData) => (
              <div key={pageData.page}>
                <Text fontSize="lg" fontStyle="normal">
                  Page {pageData.page}: {pageData.text}
                </Text>
                <Heading as="h2" size="md">
                  Image prompt:
                </Heading>
                <Text fontSize="lg" fontStyle="normal">
                  {pageData.image_prompt}
                </Text>
                <Heading as="h2" size="md">
                  Image url:
                </Heading>
                {/* <Text fontSize="lg" fontStyle="normal">
                  {pageData.image_url}
                </Text> */}
                <img src={pageData.image_url} alt={pageData.image_prompt} />
                <Divider />
                {/* <img
        src={pageData.image_prompt}
        alt={`Page ${pageData.page} Image`}
        style={{ maxWidth: '100%' }}
      /> */}
              </div>
            ))}
        </VStack>
      </Container>
    </>
  );
};

export default CreateStory;
