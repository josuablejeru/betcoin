import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import BetPlacerButton from "../components/betPlacerButton";
import CoinTicker from "../components/coinTicker";
import Score from "../components/score";

const BetPlacer = () => {
  return (
    <>
      <VStack>
        <Score value={-10} />
        <BetPlacerButton title="Price will go UP" value="UP" />
        <CoinTicker />
        <BetPlacerButton title="Price will go DOWN" value="DOWN" />
      </VStack>
    </>
  );
};

export default BetPlacer;
