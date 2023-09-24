'use client';

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
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg('');
      setLoading(true);
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
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
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
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.400'}>Forgot password?</Text>
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
                  Sign in
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
