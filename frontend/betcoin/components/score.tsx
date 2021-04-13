import { Box, Text } from "@chakra-ui/react";

interface IProps {
  value: number;
}

const Score = ({ value }: IProps) => {
  const color = setTextColor(value);
  return (
    <>
      <Box
        borderRadius="lg"
        borderWidth="4px"
        padding={4}
        textColor={color}
        overflow="hidden"
      >
        <Text>Score: {value}</Text>
      </Box>
    </>
  );
};

/**
 * Check for positiv or negativ number
 * @param number
 * @returns
 */
const setTextColor = (number) => {
  if (number > 0) {
    return "green";
  }
  if (number < 0) {
    return "red";
  }
};

export default Score;
