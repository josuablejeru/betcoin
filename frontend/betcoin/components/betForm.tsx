import { RadioGroup, Radio } from "@chakra-ui/react";
import { CoinContext } from "../contexts/coinContext";
import { useContext, useState } from "react";
import { calculatePoint } from "../utils";

interface IProps {
  counterValue: number;
  setCounter: any;
}

const BetForm = ({ counterValue, setCounter }: IProps) => {
  const [coinValue, _] = useContext(CoinContext);
  const [inputDisabled, setInputDisabled] = useState(null);

  /**
   * Disables the form controlls for one minute after submitting a new bet.
   * Calculates the new point.
   * @param event
   */
  const handleSubmit = async (event) => {
    setInputDisabled(true);
    event.preventDefault();

    const data = new FormData(event.target);
    const bet = data.get("bet");
    const startValue = data.get("coinValue");

    await sleep(6); // TODO: change timout

    const point = calculatePoint(bet, startValue, coinValue);
    setInputDisabled(false);
    setCounter(counterValue + point);
  };

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup name="bet">
        <Radio value="UP" colorScheme="green" isDisabled={inputDisabled}>
          UP
        </Radio>
        <Radio value="DOWN" colorScheme="red" isDisabled={inputDisabled}>
          DOWN
        </Radio>
      </RadioGroup>
      <input type="hidden" name="coinValue" value={coinValue} />
      <input type="submit" value="Submit" disabled={inputDisabled} />
    </form>
  );
};

const sleep = (secons: number) => {
  return new Promise((resolve) => setTimeout(resolve, secons * 1000));
};

export default BetForm;
