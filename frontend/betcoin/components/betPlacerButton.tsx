import { Text, Box } from "@chakra-ui/react";
import { BetContext } from "../contexts/coinContext";
import { useRadio } from "@chakra-ui/react";

interface IProps {
  hoock: any;
  text: string;
}

const BetPlacerButton = ({ hoock, text }: IProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(hoock);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {text}
      </Box>
    </Box>
  );
};

export default BetPlacerButton;
