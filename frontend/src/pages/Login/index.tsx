import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();
  const { login, passwordReset } = useAuth();
  const { isOpen, onToggle } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg('');
      setLoading(true);

      if (showPasswordReset) {
        if (!email) {
          setErrorMsg('Please enter your email');
          return;
        }
        const { data, error } = await passwordReset(email);
        if (error) setErrorMsg(error.message);
      } else {
        if (!password || !email) {
          setErrorMsg('Please fill in the fields');
          return;
        }
        const {
          data: { user, session },
          error,
        } = await login(email, password);
        if (error) setErrorMsg(error.message);
        if (user && session) navigate('/');
      }
    } catch (error) {
      setErrorMsg('Email or Password Incorrect');
    }
    setLoading(false);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setErrorMsg('');
  //     setLoading(true);
  //     if (!passwordRef.current?.value || !emailRef.current?.value) {
  //       setErrorMsg('Please fill in the fields');
  //       return;
  //     }
  //     const {
  //       data: { user, session },
  //       error,
  //     } = await login(emailRef.current.value, passwordRef.current.value);
  //     if (error) setErrorMsg(error.message);
  //     if (user && session) navigate('/');
  //   } catch (error) {
  //     setErrorMsg('Email or Password Incorrect');
  //   }
  //   setLoading(false);
  // };

  return (
    <Flex minH={'80vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>
            {!showPasswordReset && 'Sign in to your account'}
            {showPasswordReset && 'Reset your Password'}
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool{' '}
            <Text as="span" color={'brand.orange'}>
              features
            </Text>{' '}
            ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Collapse
                in={!showPasswordReset}
                startingHeight={1}
                animateOpacity
              >
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Collapse>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  {!showPasswordReset && <Checkbox>Remember me</Checkbox>}
                  <Text
                    cursor="pointer"
                    color={'blue.400'}
                    onClick={() => {
                      setShowPasswordReset(!showPasswordReset);
                      onToggle();
                    }}
                    margin="auto"
                  >
                    {!showPasswordReset && 'Forgot password?'}
                    {showPasswordReset && 'Back to Login'}
                  </Text>
                </Stack>
                <Button
                  type="submit"
                  color={'white'}
                  bg={'brand.orange'}
                  _hover={{
                    bg: 'brand.orange80',
                  }}
                  isLoading={loading}
                >
                  {!showPasswordReset && 'Sign In'}
                  {showPasswordReset && 'Reset'}
                </Button>
              </Stack>
              {errorMsg && (
                <Text color="red.500" textAlign="center">
                  {errorMsg}
                </Text>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
