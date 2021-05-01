import { VStack } from "@chakra-ui/layout";
import CoinTicker from "../components/coinTicker";
import Score from "../components/score";
import BetForm from "./betForm";
import { CoinProvider, ScoreProvider } from "../contexts/";
import { useState } from "react";

const BetPlacer = () => {
  const [score, setScore] = useState(0);
  return (
    <>
      <VStack>
        <CoinProvider>
          <ScoreProvider>
            <Score />
            <CoinTicker />
            <BetForm counterValue={score} setCounter={setScore} />
          </ScoreProvider>
        </CoinProvider>
      </VStack>
    </>
  );
};

export default BetPlacer;
