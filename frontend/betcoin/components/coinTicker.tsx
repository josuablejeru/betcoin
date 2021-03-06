import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CoinContext } from "../contexts/coinContext";

const CoinTicker = () => {
  const [orders, setOrders] = useState([]);
  const [coinValue, setCoinValue] = useContext(CoinContext);

  useEffect(() => {
    const ws = new WebSocket("wss://ws-feed.gdax.com");
    const chennel = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"],
        },
      ],
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(chennel));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.type !== "ticker") {
        return;
      }

      const { best_ask } = response;
      setOrders(best_ask);
      setCoinValue(best_ask);
    };

    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <Text>{orders} USD</Text>
    </>
  );
};

export default CoinTicker;
