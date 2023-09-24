import { chakra, forwardRef, ImageProps } from '@chakra-ui/react';
import * as React from 'react';

import logo from '/src/images/taleweaver_logo_svg.svg';

export const DefaultLogo = forwardRef<ImageProps, 'img'>((props, ref) => {
  return (
    <chakra.img mx="1rem" src={logo} ref={ref} width={'160px'} {...props} />
  );
});
