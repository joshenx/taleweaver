import {
  Box,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import {
  FaBehance,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { WhiteLogo } from '../../WhiteLogo';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box bg="brand.dark" color="#eeeeee">
      <Divider />
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <WhiteLogo />
            <Text fontSize={'sm'}>
              © {new Date().getFullYear()} TaleWeaver. All rights reserved.
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Links</ListHeader>
            <Link href={'/'}>Home</Link>
            <Link href={'/create'}>Weave Story</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Contribute</ListHeader>
            <Link
              href={'https://github.com/joshenx/TaleWeaver'}
              target="_blank"
            >
              GitHub
            </Link>
          </Stack>
          <ButtonGroup variant="ghost">
            {/* <IconButton
              as="a"
              href="http://linkedin.com/in/joshenxlim"
              aria-label="LinkedIn"
              target="_blank"
              icon={<FaLinkedin fontSize="1.25rem" />}
            /> */}
            <IconButton
              as="a"
              href="http://github.com/joshenx/TaleWeaver"
              aria-label="GitHub"
              target="_blank"
              icon={<FaGithub fontSize="1.25rem" />}
              color="white"
              _hover={{ bgColor: '#333333' }}
            />
            {/* <IconButton
              as="a"
              href="http://instagram.com/joshenz"
              aria-label="Instagram"
              target="_blank"
              icon={<FaInstagram fontSize="1.25rem" />}
            /> */}
          </ButtonGroup>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
