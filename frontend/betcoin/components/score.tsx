import { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";

import { ScoreContext } from "../contexts";

interface IProps {
  value: number;
}

const Score = () => {
  const [scoreValue] = useContext(ScoreContext);
  const color = setTextColor(scoreValue);
  return (
    <>
      <Box
        borderRadius="lg"
        borderWidth="4px"
        padding={4}
        textColor={color}
        overflow="hidden"
      >
        <Text>Score: {scoreValue}</Text>
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
