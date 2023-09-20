import {
  Alert,
  AlertDescription,
  AlertIcon,
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
} from '@chakra-ui/react';
import { useState } from 'react';
import trackExample from '/src/images/TrackExampleHorizontal.png';
import gradientDivider from '/src/images/GradientDivider.svg';

import { supabase } from '../../App/components/supabaseClient';
import SimpleThreeColumns from '../../App/components/SimpleThreeColumns';
import SplitWithImage from '../../App/components/SplitWithImage';
import SplitWithMessage from '../../App/components/SplitWithMessage';

const Home = () => {
  const apiKey = import.meta.env.VITE_OPENAPI_KEY;
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
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

  const handleSubmit = async () => {
    // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(prompt)) {
    //   console.log('Invalid Email');
    //   setErrorMsg('Invalid email.');
    //   openAlert();
    //   return;
    // }

    console.log(`Submitting prompt: ${prompt}`);
    // const { error } = await supabase
    //   .from('subscriptions')
    //   .upsert({
    //     email: email,
    //     // name: name,
    //   })
    //   .select();
    // if (error) {
    //   console.log(error);
    //   setErrorMsg('Something went wrong..');
    //   openAlert();
    // } else {
    //   openSuccess();
    // }

    const APIBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Generate me a 100-word story about ${prompt}`,
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
    setResponse(story);
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

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setPrompt(inputValue);
  };

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let inputValue = e.target.value;
  //   setName(inputValue);
  // };

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
        spacing="7"
        width={{ base: '100vw', sm: '60vw', md: '45vw' }}
        px={{ base: '1rem', md: '1rem' }}
        alignItems={{ base: 'center' }}
        textAlign="center"
      >
        <Heading letterSpacing="0.2rem" color="#252A33" as="h1" size="3xl">
          Create{' '}
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: '15%',
              position: 'absolute',
              bottom: 2,
              left: 2,
              bg: 'red.200',
              zIndex: -1,
            }}
          >
            personalised storybooks
          </Text>{' '}
          for your kid.
        </Heading>
        <Text fontSize="lg" fontStyle="normal">
          Are you a time-strapped working parent struggling to find quality
          storytime for your child? Say goodbye to the frustration of repetitive
          bedtime tales and the endless quest for the right book. Start weaving
          your tales today.
        </Text>
        <Divider my="1rem" />

        <Input
          focusBorderColor="brand.red"
          width={{ base: '60vw', md: '20vw' }}
          value={prompt}
          onChange={handlePromptChange}
          variant="filled"
          type="prompt"
          mt="0.5rem"
          size="md"
          placeholder="Type your prompt here"
          required
        />
        {/* <Input
          focusBorderColor='brand.red'
          value={name}
          width={{ base: '60vw', md: '20vw' }}
          onChange={handleNameChange}
          placeholder="Your Name (optional)"
          size="sm"
          variant="flushed"
        /> */}
        {!showAlert && !showSuccess && (
          <Button
            background="brand.red"
            color="white"
            fontWeight="normal"
            m="1rem 0rem"
            _hover={{ background: '#E86580' }}
            onClick={handleSubmit}
          >
            Get Story
          </Button>
        )}
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
          <Alert mt="1rem" borderRadius="10px" status="success" variant="solid">
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
      {/* <Image src={gradientDivider} width="100vw" mt="10vh" mb="-5vw" />
      <Text textAlign="center" fontSize="3xl" fontWeight="600">
        Get the guidance you need in one look.
      </Text>
      <SimpleThreeColumns />

      <SplitWithImage pt="5rem" />
      <SplitWithMessage pt="5rem" />
      <VStack
        spacing="5"
        width={{ base: '100vw', sm: '60vw', md: '30vw' }}
        px={{ base: '1rem', md: '0rem' }}
        alignItems={{ base: 'center' }}
        my="10vh"
        textAlign="center"
      >
        <Text textAlign="center" fontSize="2xl" fontWeight="600">
          We're still in progress!
        </Text>
        <Text textAlign="center" fontSize="md">
          We're as excited as you to create TaleWeaver, and we strongly believe in
          its transformative power to help you achieve your career dreams. To
          stay up to date, subscribe to receive the latest news from us!
        </Text>

        <Button
          background="brand.red"
          color="white"
          fontWeight="normal"
          m="1rem 0rem"
          _hover={{ background: '#E86580' }}
          onClick={handleScrollToTop}
        >
          Subscribe
        </Button>
        <Box>
          <Icon
            as={Arrow}
            color={'gray.800'}
            w={71}
            position={'relative'}
            right={-91}
            top={'-30px'}
          />
          <Text
            fontSize={'lg'}
            fontFamily={'Caveat'}
            position={'relative'}
            right={'-130px'}
            top={'-75px'}
            transform={'rotate(10deg)'}
          >
            Get notified!
          </Text>
        </Box>
      </VStack> */}
      <Text fontSize="lg" fontStyle="normal">
        {response}
      </Text>
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
