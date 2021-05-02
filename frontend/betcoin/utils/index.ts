export const calculatePoint = (bet: string, before: number, after: number) => {
  if ((bet === "UP" && before < after) || (bet === "DOWN" && before > after)) {
    console.debug(before, after);
    return 1;
  }

  console.debug(before, after);
  return -1;
};
