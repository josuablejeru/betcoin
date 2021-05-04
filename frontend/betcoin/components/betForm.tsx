import { RadioGroup, Radio } from "@chakra-ui/react";
import { CoinContext, ScoreContext } from "../contexts/";
import { useContext, useState, useEffect } from "react";
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
  const [guessRequest, setGuessRequest] = useState(null);

  useEffect(() => {
    if (guessRequest && guessRequest.pending === false) {
      const request = new GuessRequest(ls.get<string>("SESSION_ID"));
      request.setFormData(guessRequest.guess);
      request.setBtcBefore(guessRequest.btc_value);
      request.setBtcAfter(coinValue);
      request.resolve(setScoreValue);

      console.debug(request);
    }
  }, [guessRequest]);

  /**
   * Disables the form controlls for one minute after submitting a new bet.
   * Calculates the new point.
   * @param event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputDisabled(true);

    const guess = { btc_value: coinValue, guess: new FormData(event.target), pending: true };
    setGuessRequest(guess);

    await sleep(10); // TODO: change timout

    setGuessRequest({ ...guess, pending: false });
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
      <input type="submit" value="Submit" disabled={inputDisabled} />
    </form>
  );
};

const sleep = (secons: number) => {
  return new Promise((resolve) => setTimeout(resolve, secons * 1000));
};

export default BetForm;
