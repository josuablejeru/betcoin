import { RadioGroup, Radio } from "@chakra-ui/react";
import { CoinContext } from "../contexts/coinContext";
import { useContext } from "react";

const BetForm = () => {
  const [coinValue, _] = useContext(CoinContext);

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

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  console.log(data.get("bet"), data.get("coinValue"));
};

export default BetForm;
