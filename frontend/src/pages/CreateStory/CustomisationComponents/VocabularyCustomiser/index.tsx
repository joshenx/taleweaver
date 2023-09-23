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

interface VocabularyCustomiserProps {
  setAge: (age: number) => void;
  age: number;
  isActive: boolean;
  onToggleActive: (state: boolean) => void;
}

export const VocabularyCustomiser: React.FC<VocabularyCustomiserProps> = ({
  age,
  setAge,
  isActive,
  onToggleActive,
}) => {
  const handleSliderChange = (newValue: number) => {
    // Call the callback function to set the age
    setAge(newValue);
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
        <Text as="b" p="1rem">
          Vocabulary:
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
          <Text>{age} years</Text>
        </Box>
        <Slider
          isDisabled={!isActive}
          aria-label="slider-ex-2"
          id="slider"
          defaultValue={age}
          min={0}
          max={20}
          onChange={handleSliderChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </HStack>
  );
};
