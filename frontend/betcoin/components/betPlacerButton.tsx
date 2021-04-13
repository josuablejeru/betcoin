import { Text, Button } from "@chakra-ui/react";

interface IProps {
  title: string;
  value: state;
}

type state = "UP" | "DOWN";

const BetPlacerButton = ({ title, value }: IProps) => {
  return (
    <Button colorScheme="teal" variant="solid" size="lg">
      <Text>{title}</Text>
    </Button>
  );
};

export default BetPlacerButton;
