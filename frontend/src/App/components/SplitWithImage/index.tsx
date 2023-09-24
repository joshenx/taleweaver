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
import trackdisplaySrc from '/src/images/trackdisplay.png';

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

export default function SplitWithImage(props: any) {
  return (
    <Container width="80vw" maxW={'7xl'} py={12} textAlign="left">
      <SimpleGrid {...props} columns={{ base: 1, md: 2 }} spacing={10}>
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
            CUSTOMISATION
          </Text>
          <Heading color={'brand.dark'}>
            Tailor your stories for vocabulary, values, and genre.
          </Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Experience the power of personalized storytelling like never before
            with our app's versatile customization options. Craft stories that
            resonate with your child's vocabulary, explore a world of genres,
            and impart the values that matter most to your family. Plus, don't
            miss the chance to make your child the star of their very own
            adventures!
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature text={'Age-Appropriate Vocabulary'} />
            <Feature text={'Genre Variety'} />
            <Feature text={'Teach Morals and Values'} />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src=""
            objectFit="contain"
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
