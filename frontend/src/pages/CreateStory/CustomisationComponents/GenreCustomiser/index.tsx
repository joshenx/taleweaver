import { Box, Text, Checkbox, HStack, Select } from '@chakra-ui/react';

interface GenreCustomiserProps {
  setGenre: (values: string) => void;
  genre: string;
  isActive: boolean;
  onToggleActive: (state: boolean) => void;
}

export const GenreCustomiser: React.FC<GenreCustomiserProps> = ({
  setGenre,
  genre,
  isActive,
  onToggleActive,
}) => {
  const genres = [
    'Adventure',
    'Fantasy',
    'Mystery',
    'Science Fiction',
    'Fairy Tale',
    'Animal Stories',
    'Humor',
    'Educational',
    'Poetry',
  ];

  const handleSelectChange = (event: { target: { value: string } }) => {
    // Call the callback function to set the age
    setGenre(event.target.value);
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
          Genre:
        </Text>
      </Checkbox>
      <Box flexGrow={10}>
        <Select
          isDisabled={!isActive}
          onChange={handleSelectChange}
          placeholder="Choose a Genre"
        >
          {genres.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            );
          })}
        </Select>
      </Box>
    </HStack>
  );
};
