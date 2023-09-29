import {
  Box,
  Text,
  Checkbox,
  HStack,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';

interface PageNumCustomiserProps {
  setPageNum: (pageNum: number) => void;
  pageNum: number;
  isActive: boolean;
  onToggleActive: (state: boolean) => void;
}

export const PageNumCustomiser: React.FC<PageNumCustomiserProps> = ({
  pageNum,
  setPageNum,
  isActive,
  onToggleActive,
}) => {
  const handleSliderChange = (newValue: number) => {
    // Call the callback function to set the age
    setPageNum(newValue);
  };

  return (
    <HStack
      display="flex"
      width="100%"
      minHeight="50px"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ base: 'column', md: 'row' }}
      align="stretch"
    >
      <Checkbox
        onChange={(e) => {
          onToggleActive(!isActive);
        }}
        isChecked={isActive}
        width="200px"
        m="1rem"
      >
        <Text as="b" p="0.5rem">
          Number of Pages:
        </Text>
      </Checkbox>
      <Box
        width={{ base: '100%', sm: '70%' }}
        flexGrow={1}
        display="flex"
        flexDirection="row"
        alignContent="center"
      >
        <Box minWidth="5rem" mx="1rem">
          <Text>{pageNum} pages</Text>
        </Box>
        <Slider
          isDisabled={!isActive}
          aria-label="slider-ex-2"
          id="slider"
          defaultValue={pageNum}
          min={5}
          max={15}
          onChange={handleSliderChange}
        >
          <SliderTrack>
            <SliderFilledTrack bg="brand.orange" />
          </SliderTrack>
          <SliderThumb borderColor="brand.orange" />
        </Slider>
      </Box>
    </HStack>
  );
};
