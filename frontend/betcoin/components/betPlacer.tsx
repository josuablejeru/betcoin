import { VStack } from "@chakra-ui/layout";
import CoinTicker from "../components/coinTicker";
import Score from "../components/score";
import BetForm from "./betForm";
import { CoinProvider, ScoreProvider } from "../contexts/";

const BetPlacer = () => {
  return (
    <>
      <VStack>
        <CoinProvider>
          <ScoreProvider>
            <Score />
            <CoinTicker />
            <BetForm />
          </ScoreProvider>
        </CoinProvider>
      </VStack>
    </>
  );
};

export default BetPlacer;
