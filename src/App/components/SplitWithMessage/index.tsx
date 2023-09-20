'use client';

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import chatdisplaySrc from '/src/images/chatdisplay.png';

interface FeatureProps {
  text: string;
}

const Feature = ({ text }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithMessage(props: any) {
  return (
    <Container maxW={'7xl'} py={12}>
      <SimpleGrid {...props} columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={chatdisplaySrc}
            objectFit="contain"
          />
        </Flex>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'red'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('red.50', 'red.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            MESSAGING
          </Text>
          <Heading color={'brand.dark'}>
            Connect with those living your dream
          </Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Create a free account and learn from people who have done it.
            Message them and understand how you can follow in their tracks.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature text={'Anonymous'} />
            <Feature text={'Industry Professionals'} />
            <Feature text={'Messaging and Voice Chat'} />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
