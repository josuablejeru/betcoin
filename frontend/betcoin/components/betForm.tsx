import { RadioGroup, Radio } from "@chakra-ui/react";
import { CoinContext } from "../contexts/coinContext";
import { useContext } from "react";

interface IProps {
  setCounter: Function
}

const BetForm = ({setCounter}: IProps) => {
  const [coinValue, _] = useContext(CoinContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const time = new Date(Date.now())
    const data = new FormData(event.target);
    setCounter(1);
    console.log(data.get("bet"), data.get("coinValue"), time);
  };

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup name="bet">
        <Radio value="UP" colorScheme="green">
          UP
        </Radio>
        <Radio value="DOWN" colorScheme="red">
          DOWN
        </Radio>
      </RadioGroup>
      <input type="hidden" name="coinValue" value={coinValue} />
      <input type="submit" value="Submit" />
    </form>
  );
};



export default BetForm;
