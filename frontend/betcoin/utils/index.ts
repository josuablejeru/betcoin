export const calculatePoint = (
  bet: string,
  coinValue: number,
  currentValue: number
) => {
  if (coinValue > currentValue && bet == "UP") {
    console.log(coinValue, currentValue);
    return 1;
  }
  if (coinValue < currentValue && bet == "DOWN") {
    console.log(coinValue, currentValue);
    return 1;
  }

  console.log(coinValue, currentValue);
  return -1;
};
