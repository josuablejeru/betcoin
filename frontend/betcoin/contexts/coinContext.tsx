import { useState, createContext } from "react";

interface IProps {
  children: any;
}

export const CoinContext = createContext([]);

export const CoinProvider = (props: IProps) => {
  const [coinValue, setCoinValue] = useState(0);
  return (
    <CoinContext.Provider value={[coinValue, setCoinValue]}>
      {props.children}
    </CoinContext.Provider>
  );
};
