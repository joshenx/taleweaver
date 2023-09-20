import { ReactElement } from 'react'
import { Box, SimpleGrid, Icon, Text, Stack, Flex, Image } from '@chakra-ui/react'
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc'
import messagesIcon from '/src/images/messagesIcon.svg'
import searchIcon from '/src/images/searchIcon.svg'
import honestIcon from '/src/images/honestIcon.svg'

interface FeatureProps {
  title: string
  text: string
  img: ReactElement
}

const Feature = ({ title, text, img }: FeatureProps) => {
  return (
    <Stack textAlign={'center'}>
      <Flex
        height='300px'
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'none'}
        mb={1}>
        {img}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text  color={'gray.600'}>{text}</Text>
    </Stack>
  )
}

export default function SimpleThreeColumns() {
  return (
    <Box p={4} width={{ base: '100vw', md: '80vw', lg:'60vw' }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5,  md: 20}}>
        <Feature
          img={<Image src={honestIcon} w={'80%'} h={'80%'} />}
          title={'Trustworthy and Honest'}
          text={
            'Share and discover authentic career paths anonymously, fostering a culture of honesty and valuable insights.'
          }
        />
        <Feature
          img={<Image src={searchIcon} w={'80%'} h={'80%'} />}
          title={'Robust Search Engine'}
          text={
            'With advanced filters and sorting options, you can refine your search based on industry, role, location, skills, and more.'
          }
        />
        <Feature
          img={<Image src={messagesIcon} w={'80%'} h={'80%'} />}
          title={'Communication Platform'}
          text={
            ' Message and gain insights from experienced professionals, mentors, and alumni with ease.'
          }
        />
      </SimpleGrid>
    </Box>
  )
}