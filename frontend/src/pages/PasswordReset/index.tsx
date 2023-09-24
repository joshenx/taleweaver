'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
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
import { useAuth } from '../../context/AuthProvider';

export default function PasswordReset() {
  const { updatePassword } = useAuth(); // Replace with your authentication context function
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setErrorMsg('Please fill all the fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match. Try again");
      return;
    }
    try {
      setErrorMsg('');
      setLoading(true);
      // Replace with your authentication context updatePassword function
      const { data, error } = await updatePassword(password);
      if (!error) {
        navigate('/');
      }
    } catch (error) {
      setErrorMsg('Error in Updating Password. Please try again');
    }
    setLoading(false);
  };

  return (
    <Flex minH={'80vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Password Reset
          </Heading>
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
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="confirm-password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
              {errorMsg && (
                <Alert status="error" mt={4} mb={2} variant="subtle">
                  <AlertIcon />
                  {errorMsg}
                </Alert>
              )}
              <Button
                type="submit"
                bg={'brand.orange'}
                _hover={{
                  bg: 'brand.orange80',
                }}
                color="white"
                isLoading={loading}
                loadingText="Updating"
                mt={4}
              >
                Update
              </Button>
              <Stack pt={6}>
                <Text align={'center'}>
                  Remembered your password?{' '}
                  <Link href="/login" color={'blue.400'}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
