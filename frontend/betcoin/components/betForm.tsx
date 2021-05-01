import { RadioGroup, Radio } from "@chakra-ui/react";
import { CoinContext, ScoreContext } from "../contexts/";
import { useContext, useState } from "react";
import { GuessRequest } from "../api";
import * as ls from "local-storage";

interface IProps {
  counterValue: number;
  setCounter: any;
}

const BetForm = ({ counterValue, setCounter }: IProps) => {
  const [coinValue] = useContext(CoinContext);
  const [scoreValue, setScoreValue] = useContext(ScoreContext);

  const [inputDisabled, setInputDisabled] = useState(null);

  /**
   * Disables the form controlls for one minute after submitting a new bet.
   * Calculates the new point.
   * @param event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputDisabled(true);

    const request = new GuessRequest(ls.get<string>("SESSION_ID"));
    request.setFormData(new FormData(event.target));

    await sleep(1); // TODO: change timout

    request.setBtcAfter(coinValue);
    request.resolve(setScoreValue);

    setInputDisabled(false);
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
