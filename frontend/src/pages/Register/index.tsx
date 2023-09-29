'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { supabase } from '../../App/components/supabaseClient';

//TODO: route this through backend
async function getUserByEmail(email: string) {
  try {
    const { data } = await supabase.from('users').select().eq('email', email);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill all the fields');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Please ensure password is at least 6 characters');
      return;
    }
    try {
      setErrorMsg('');
      setMsg('');
      setLoading(true);
      // Check if user exists
      const usersWithEmail = getUserByEmail(email);
      if (usersWithEmail && usersWithEmail.length !== 0) {
        setErrorMsg('This email is already registered. Please login or reset password instead.');
        setLoading(false);
      }
    }
    catch (error) {
      console.log(error);
      setErrorMsg('Error in Creating Account');
    }
    try {
      // Call your registration function
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (!error && data) {
        setMsg(
          'Registration Successful. Check your email to confirm your account',
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('Error in Creating Account');
    }
    setLoading(false);
  };

  return (
    <Flex minH={'80vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to start creating awesome stories! 📖
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'white'} // Use 'white' instead of useColorModeValue
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl> */}
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  isLoading={loading}
                  loadingText="Submitting"
                  size="lg"
                  color={'white'}
                  bg={'brand.orange'}
                  _hover={{
                    bg: 'brand.orange80',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link href="/login" color={'blue.400'}>
                    Login
                  </Link>
                </Text>
              </Stack>
              {errorMsg && (
                <Text color="red.500" textAlign="center">
                  {errorMsg}
                </Text>
              )}
              {msg && (
                <Text color="green.500" textAlign="center">
                  {msg}
                </Text>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
