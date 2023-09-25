import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Container,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultLogo } from '../../DefautLogo';
import { useAuth } from '../../../context/AuthProvider';
import { routerType } from '../../../types/router.types';
import pagesData from '../../../pages/pagesData';

export default function NavBar() {
  const { session, auth, user, signOut } = useAuth();
  const { isOpen, onToggle } = useDisclosure();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(session);
    console.log(user);
    console.log(auth);
  }, [user]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
    navigate('/');
  };

  return (
    <Box>
      <Flex
        position="fixed"
        top="0"
        w="100%"
        backdropFilter="contrast(98%) blur(5px)"
        boxShadow="0px 0px 30px 0px rgba(0, 0, 0, 0.15)"
        bg="rgba(255,255,255,0.5)"
        color="gray.600"
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor="gray.200"
        align={'center'}
        zIndex="overlay"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <DefaultLogo />

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {!auth && (
            <>
              <Box margin="auto">
                <Link to={'/login'}>
                  <Button
                    _hover={{
                      textDecoration: 'none',
                      color: 'gray.800',
                    }}
                    margin="auto"
                    fontSize={'sm'}
                    fontWeight={400}
                    variant={'link'}
                  >
                    Sign In
                  </Button>
                </Link>
              </Box>
              <Link to={'/register'}>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={400}
                  color={'white'}
                  bg={'brand.orange'}
                  _hover={{
                    bg: 'brand.orange80',
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          {auth && (
            <>
              <Box
                fontSize={'sm'}
                fontWeight={400}
                margin="auto"
                textAlign="center"
              >
                {user?.email}
              </Box>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={400}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {pagesData
        .filter(({ mainNav }: routerType) => mainNav)
        .map(({ path, title }: routerType, index) => (
          <Box px="5px" key={title}>
            <Link to={`${path}`} color={linkColor}>
              <Button
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
              >
                {title}
              </Button>
            </Link>
          </Box>
        ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      mt="3rem"
      p={4}
      display={{ md: 'none' }}
    >
      {pagesData
        .filter(({ mainNav }: routerType) => mainNav)
        .map(({ path, title }: routerType, index) => (
          <MobileNavItem path={path} key={index} title={title} />
        ))}
    </Stack>
  );
};

const MobileNavItem = ({ path, key, title }: NavItem) => {
  return (
    <Stack spacing={4}>
      <Link
        as="a"
        to={path}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          py={2}
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {title}
        </Text>
      </Link>
    </Stack>
  );
};
