import { VStack } from "@chakra-ui/layout";
import CoinTicker from "../components/coinTicker";
import Score from "../components/score";
import BetForm from './betForm';
import { CoinProvider } from "../contexts/coinContext";
import {useState} from 'react';

const BetPlacer = () => {
  const [score, setScore] = useState(0);
  return (
    <>
      <VStack>
        <CoinProvider>
          <Score value={score} />
          <CoinTicker />
          <BetForm setCounter={setScore}/>
        </CoinProvider>
      </VStack>
    </>
  );
};

export default BetPlacer;
