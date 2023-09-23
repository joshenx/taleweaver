import { Box, Text, Checkbox, HStack, Select } from '@chakra-ui/react';

interface ValuesCustomiserProps {
  setValues: (values: string) => void;
  values: string;
  isActive: boolean;
  onToggleActive: (state: boolean) => void;
}

export const ValuesCustomiser: React.FC<ValuesCustomiserProps> = ({
  setValues,
  values,
  isActive,
  onToggleActive,
}) => {
  const morals = ['Generosity', 'Integrity', 'Graciousness'];

  const handleSelectChange = (event: { target: { value: string } }) => {
    // Call the callback function to set the age
    setValues(event.target.value);
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
          Values/Morals:
        </Text>
      </Checkbox>
      <Box flexGrow={10}>
        <Select
          isDisabled={!isActive}
          onChange={handleSelectChange}
          placeholder="Choose a Moral"
        >
          {morals.map((moral) => {
            return (
              <option key={moral} value={moral}>
                {moral}
              </option>
            );
          })}
        </Select>
      </Box>
    </HStack>
  );
};
