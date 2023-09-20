import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  ScaleFade,
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
import BadWordsFilter from 'bad-words';
import React, { useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';

import { supabase } from '../supabaseClient';

export const PromptInput = (props: any) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [storyPrompt, setStory] = useState('');
  const [name, setName] = useState('');
  const [sliderValue, setSliderValue] = React.useState(3)
  const [currTime, setCurrTime] = useState<string | undefined>('');
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

  var filter = new BadWordsFilter();

  const handleSubmit = async () => {
    if (filter.isProfane(storyPrompt)) {
      openAlert();
      return;
    }

    console.log(`Submitting ${storyPrompt}..`);
  }

  const updateTime = () => {
    setCurrTime(document.getElementById('rhap_current-time')?.innerText);
    console.log(`Time set to ${currTime}`);
  };

  const handleStoryPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setStory(inputValue);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setName(inputValue);
  };

  return (
    <Popover>
      <Tooltip
        hasArrow
        fontSize="sm"
        textAlign="center"
        label="Customize your story for your little one!"
        placement="bottom"
        openDelay={500}
      >
        <Box
          style={{
            display: 'flex',
            flexGrow: 1,
            flexShrink: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PopoverTrigger>
            <Button
              rightIcon={<FiHelpCircle />}
              onClick={() => updateTime()}
              fontWeight="normal"
              width="100%"
            >
              Create Story
            </Button>
          </PopoverTrigger>
        </Box>
      </Tooltip>
      <Portal>
        <PopoverContent w={{ base: '80vw', md: '500px' }}>
          <PopoverArrow />
          <PopoverHeader alignSelf="center">
            <Heading size="md">NEW TALE</Heading>
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Flex
              gap={2}
              direction={{
                base: 'column',
                md: 'row',
              }}
              alignItems="stretch"
            >
              {/* FORM INFO */}
              <Flex
                direction={{
                  base: 'row-reverse',
                  md: 'column',
                }}
              >
                <VStack flexGrow="1" 
                  px={{ base: '2rem', md: '0rem' }} alignItems={{ base: 'left' }}>
                  <Heading
                      size="lg"
                    >
                      Weave a story about...
                  </Heading>
                  <Textarea
                    value={storyPrompt}
                    onChange={handleStoryPromptChange}
                    variant="filled"
                    mt="0.5rem"
                    resize="none"
                    size="xs"
                    placeholder="Type your story here!"
                  />
                  <Heading
                      size="md"
                    >
                      that focuses on...
                  </Heading>
                  <Tabs onChange={(index) => setTabIndex(index)} variant='soft-rounded'>
                  <TabList>
                    <Tab>Vocabulary</Tab>
                    <Tab>Morals/Values</Tab>
                    <Tab>Genre</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>

                      {/* Vocabulary Section */}
                    <Slider aria-label='slider-ex-2'
                      id='slider'
                      defaultValue={5}
                      min={0}
                      max={20}
                      colorScheme='teal'
                      onChange={(v) => setSliderValue(v)}>
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
                  <Heading
                      size="lg"
                    >
                      The main character is
                  </Heading>
                  <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Subject's Name (optional)"
                    size="xs"
                    variant="filled"
                  />
                  {!showAlert && !showSuccess && (
                    <Button
                      fontWeight="normal"
                      m="1rem 0rem"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
                </VStack>
              </Flex>
            </Flex>
          </PopoverBody>
          <PopoverFooter alignSelf="center">
            {showAlert && (
              <ScaleFade initialScale={0.9} in={showAlert}>
                <Alert borderRadius="10px" status="error" variant="solid">
                  <AlertIcon />
                  <AlertDescription fontSize="sm">
                    Submission failed. Either our server is down or your storyPrompt
                    was naughty!
                  </AlertDescription>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={closeAlert}
                  />
                </Alert>
              </ScaleFade>
            )}
            {showSuccess && (
              <ScaleFade initialScale={0.9} in={showSuccess}>
                <Alert borderRadius="10px" status="success" variant="solid">
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
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
