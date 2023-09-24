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
    <Container width="80vw" maxW={'7xl'} py={12} textAlign="left">
      <SimpleGrid {...props} columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src=""
            objectFit="contain"
          />
        </Flex>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'brand.orange'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('red.50', 'red.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            SAFETY
          </Text>
          <Heading color={'brand.dark'}>
            Safe, Secure, and Age-Appropriate Content Every Time
          </Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            "Your child's safety is our top priority, and we've gone the extra
            mile to ensure that our content is a safe haven for young minds. Say
            goodbye to worries about profanity, mature themes, or
            age-inappropriate material. Our content is carefully curated and
            designed with your child's well-being in mind, offering a worry-free
            experience for both parents and kids.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature text={'Profanity-Free'} />
            <Feature text={'Maturity-Theme Filters'} />
            <Feature text={'Age-Specific Content'} />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
