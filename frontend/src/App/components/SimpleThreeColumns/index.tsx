import { ReactElement } from 'react';
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Image,
} from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';
import safeIcon from '/src/images/safe.svg';
import customisationIcon from '/src/images/customisation.svg';
import illustrationIcon from '/src/images/illustration.svg';

interface FeatureProps {
  title: string;
  text: string;
  img: ReactElement;
}

const Feature = ({ title, text, img }: FeatureProps) => {
  return (
    <Stack textAlign={'center'}>
      <Flex
        height="300px"
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'none'}
        mb={1}
      >
        {img}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={4} width={{ base: '100vw', md: '80vw', lg: '60vw' }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, md: 20 }}>
        <Feature
          img={
            <Image
              src={safeIcon}
              w={'80%'}
              h={'80%'}
              filter="drop-shadow(10px 10px 10px #eed4cd)"
            />
          }
          title={'Guaranteed Safety'}
          text={
            'Peace of mind with moderated safety parameters, ensuring age-appropriate and safe storytelling.'
          }
        />
        <Feature
          img={
            <Image
              src={customisationIcon}
              w={'80%'}
              h={'80%'}
              filter="drop-shadow(10px 10px 10px #eed4cd)"
            />
          }
          title={'Customizable and Personalised'}
          text={
            'Feature your child as the hero of every story, choose a moral for your child to learn, or set an age-specific vocabulary setting.'
          }
        />
        <Feature
          img={
            <Image
              src={illustrationIcon}
              w={'80%'}
              h={'80%'}
              objectFit="contain"
              filter="drop-shadow(10px 10px 10px #eed4cd)"
            />
          }
          title={'Unique Illustrations'}
          text={
            "Accompany our stories with beautiful imagery to stimulate your child's imagination."
          }
        />
      </SimpleGrid>
    </Box>
  );
}
