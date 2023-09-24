import { chakra, forwardRef, ImageProps } from '@chakra-ui/react';
import * as React from 'react';

import logo from '/src/images/taleweaver_logo_light_svg.svg';

export const WhiteLogo = forwardRef<ImageProps, 'img'>((props, ref) => {
  return <chakra.img src={logo} ref={ref} width={'160px'} {...props} />;
});
