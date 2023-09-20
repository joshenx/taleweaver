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
    <Container maxW={'7xl'} py={12}>
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
            Our TaleWeaver
          </Text>
          <Heading color={'brand.dark'}>
            Simple, intuitive career tracks display
          </Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Drawing inspiration on train route information you would normally
            see at a train station, our innovative display allows you to view
            all tracks leading to your dream career at once.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature text={'Industry Changes'} />
            <Feature text={'Required Skills and Qualifications'} />
            <Feature text={'Past and Present Roles'} />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={trackdisplaySrc}
            objectFit="contain"
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
