import { VStack } from "@chakra-ui/layout";
import CoinTicker from "../components/coinTicker";
import Score from "../components/score";
import BetForm from './betForm';
import { CoinProvider } from "../contexts/coinContext";

const BetPlacer = () => {
  return (
    <>
      <VStack>
        <CoinProvider>
          <Score value={-10} />
          <CoinTicker />
          <BetForm />
        </CoinProvider>
      </VStack>
    </>
  );
};

export default BetPlacer;
