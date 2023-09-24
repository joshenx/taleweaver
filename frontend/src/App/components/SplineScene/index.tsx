import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import pagesData from '../../../pages/pagesData';
import { routerType } from '../../../types/router.types';
import { DefaultLogo } from '../../DefautLogo';
import { useState } from 'react';
import React from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function SplineScene() {
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  function onLoad(spline) {
    // Once the scene is loaded, fade out the white background
    setTimeout(() => setBackgroundOpacity(0), 1000);
  }

  return (
    <Box
      position="absolute"
      margin="0"
      p="0"
      top="0"
      left="0"
      width="100%"
      height="100vh"
      overflow="hidden"
      zIndex="-1"
    >
      {/* White background */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          opacity: backgroundOpacity,
          transition: 'opacity 5s ease', // Control the duration of the fade here
          zIndex: 1,
        }}
      ></Box>

      {/* Spline scene */}
      <Spline
        onLoad={onLoad}
        scene="https://prod.spline.design/nli0UYEy-6i4iAq1/scene.splinecode"
      />
    </Box>
  );
}
