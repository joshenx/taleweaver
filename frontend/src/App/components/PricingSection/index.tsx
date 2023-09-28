import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

function PriceWrapper(props: Props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
    >
      {children}
    </Box>
  );
}

export default function PricingSection() {
  const navigate = useNavigate();

  const navigateToCreate = () => {
    // 👇️ navigate to /contacts
    navigate('/create');
  };
  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Invest in safe, educational screentime.
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Start with 2 free storybooks with all our customisation features.
          Cancel at anytime.
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="xl">
              Reader's Club
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                S$
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                15
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}
          >
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Unlimited text stories
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Maximum of 500 illustrations
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Full customisation features
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Content safety
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" variant="styled" onClick={navigateToCreate}>
                Start trial
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}
            >
              <Text
                textTransform="uppercase"
                bg="brand.orange"
                px={3}
                py={1}
                color="gray.100"
                fontSize="sm"
                fontWeight="500"
                rounded="xl"
              >
                Most Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="xl">
                Turbo Reader's Club
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  S$
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  30
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Unlimited text stories
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Unlimited illustrations
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Full customisation features
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Content safety
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button
                  w="full"
                  variant="styled-color"
                  onClick={navigateToCreate}
                >
                  Start trial
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        {/*  <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Scale
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                349
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}
          >
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                unlimited build minutes
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Lorem, ipsum dolor.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                5TB Lorem, ipsum dolor.
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline">
                Start trial
              </Button>
            </Box>
          </VStack>
        </PriceWrapper> */}
      </Stack>
    </Box>
  );
}
