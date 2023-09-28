import {
  createIcon,
  Button,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  ScaleFade,
  Text,
  Box,
  Icon,
  useDisclosure,
  VStack,
  StackDivider,
  Link,
  Container,
} from '@chakra-ui/react';
import { useState } from 'react';
import trackExample from '/src/images/TrackExampleHorizontal.png';
import gradientDivider from '/src/images/GradientDivider.svg';
import taleweaverIcon from '/src/images/taleweaver_icon_svg.svg';
import heroBackground from '/src/images/heroBackground.png';

import { useNavigate } from 'react-router-dom';
import { supabase } from '../../App/components/supabaseClient';
import SimpleThreeColumns from '../../App/components/SimpleThreeColumns';
import SplitWithImage from '../../App/components/SplitWithImage';
import SplitWithMessage from '../../App/components/SplitWithMessage';
import SplineScene from '../../App/components/SplineScene';
import PricingSection from '../../App/components/PricingSection';

const Home = () => {
  /*
  const handleSubmitDebugWithoutApi = () => {
    const story = `{
      "title": "The Adventures of Lily and Max",
      "focus": "vocabulary",
      "vocabulary_age": "3",
      "story": [
        {
          "page": 1,
          "text": "Once upon a time, there was a girl named Lily and a boy named Max. They were best friends. Lily had a beautiful pink dress, and Max wore a cool blue hat.",
          "image_prompt": "An illustration of Lily wearing a pink dress and Max wearing a blue hat, holding hands and smiling"
        },
        {
          "page": 2,
          "text": "One sunny day, Lily and Max went to the park. They saw a big, yellow slide. 'Let's go down the slide,' said Max. 'Yes,' replied Lily with excitement.",
          "image_prompt": "An image of Lily and Max sliding down a bright yellow slide, laughing and having fun"
        },
        {
          "page": 3,
          "text": "At the park, they also found a friendly dog named Spot. Spot had black and white fur. 'Woof woof!' barked Spot. 'He wants to play with us,' said Lily. 'Let's throw the ball!' exclaimed Max.",
          "image_prompt": "An illustration of Lily, Max, and Spot playing with a red ball in the park, surrounded by green trees and colorful flowers"
        },
        {
          "page": 4,
          "text": "Lily and Max played with the ball until it was time to go home. They were tired but happy. 'Let's walk together,' suggested Lily. 'Hold my hand,' said Max.",
          "image_prompt": "A picture of Lily and Max walking hand in hand, with the sun setting behind them, casting a warm orange glow"
        },
        {
          "page": 5,
          "text": "Finally, they reached their houses. Lily gave Max a big hug. 'Goodnight, Max,' said Lily. 'Goodnight, Lily,' replied Max. They went to sleep, looking forward to more adventures tomorrow.",
          "image_prompt": "An image of Lily and Max hugging each other goodnight, with their houses in the background and a starry night sky"
        }
      ]
    }`;
    console.log(story);
    setResponse(JSON.parse(story));
  };
  */

  /*
  const handleSubmitWithoutApi = async () => {
    console.log(`Submitting prompt: ${prompt}`);

    const APIBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Generate a ${numPages}-page story about ${prompt}. For each page,
          include an image prompt that is specific, colourful and creative and
          matches the story of the page content. ${additionalPromptInfo}.  Format it in json format, like this example:
          {
          "title": "Charlie and his ball",
          "focus": "${focus}",
          "vocabulary_age": "${vocabAge}",
          "story": {
            ["page": 1,
            "text": "First page of the story text goes here",
            "image_prompt": "A young boy and his red ball on a green landscape with a tree in the background"],
          ...
          }}`,
        },
      ],
      temperature: 0.7,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
      body: JSON.stringify(APIBody),
    });

    const data = await response.json();
    const story = data.choices[0].message.content;

    console.log(story);
    setResponse(JSON.parse(story));
  };
  */
  const navigate = useNavigate();

  const navigateToCreate = () => {
    // 👇️ navigate to /contacts
    navigate('/create');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollToTop = () => {
    scrollToTop();
  };

  return (
    <Flex
      gap={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      m="3rem"
      minHeight="80vh"
    >
      {/* <Image
        src={trackExample}
        mt="5rem"
        width={{ base: '90vw', md: '500px' }}
      /> */}
      <VStack
        mt="3rem"
        spacing="5"
        px={{ base: '1rem', md: '1rem' }}
        alignItems={{ base: 'center' }}
        textAlign="center"
        position="relative"
      >
        {/* <SplineScene /> */}

        <VStack
          pt={{ base: '1rem', lg: '4rem' }}
          spacing="10"
          width={{ base: '100vw', sm: '60vw', md: '45vw' }}
        >
          <Heading as="h1" size="3xl">
            Personalised, educational storybooks for your kid.
          </Heading>
          <Image
            src={heroBackground}
            position="absolute"
            width="min(1920px, 100%)"
            top="-10vw"
            margin="auto"
            zIndex={-1}
            filter="drop-shadow(-5px 5px 5px #cccccc)"
          />
          <Text fontSize="lg" fontStyle="normal">
            Are you a time-strapped working parent struggling to find quality
            storytime for your child? Say goodbye to the frustration of
            repetitive bedtime tales and the endless quest for the right book.
            Start weaving your tales today.
          </Text>
          <Divider my="1rem" />
          <Button variant="styled" onClick={navigateToCreate}>
            Weave Story
          </Button>
        </VStack>
        <Image
          src={gradientDivider}
          width="min(1920px, 100vw)"
          mb="-5vw"
          zIndex={-2}
        />
        <Text textAlign="center" fontSize="3xl" fontWeight="600">
          The creative, guilt-free alternative to mindless screen-time.
        </Text>
        <SimpleThreeColumns />

        <SplitWithImage pt="5rem" />
        <SplitWithMessage pt="5rem" />
        <PricingSection />
        <VStack
          spacing="5"
          width={{ base: '100vw', sm: '60vw', md: '30vw' }}
          px={{ base: '1rem', md: '0rem' }}
          alignItems={{ base: 'center' }}
          my="3rem"
          textAlign="center"
        >
          <Image alt="TaleWeaver icon" src={taleweaverIcon} height="50px" />
          <Text textAlign="center" fontSize="2xl" fontWeight="600">
            We're still in BETA!
          </Text>
          <Text textAlign="center" fontSize="md">
            We're as excited as you to weave the best tales for your kids, and
            we strongly believe in its transformative power to become a healthy
            alternative to mindless screentime. Try it today and leave some
            feedback for us to improve!
          </Text>

          <Button variant="styled" onClick={navigateToCreate}>
            Weave Story
          </Button>
          <Box>
            <Icon
              as={Arrow}
              color={'gray.800'}
              w={81}
              position={'relative'}
              right={-110}
              top={'-30px'}
            />
            <Text
              fontSize={'lg'}
              fontFamily={'Caveat'}
              position={'relative'}
              right={'-150px'}
              top={'-75px'}
              transform={'rotate(10deg)'}
            >
              Try it for free!
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Flex>
  );
};

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

export default Home;
