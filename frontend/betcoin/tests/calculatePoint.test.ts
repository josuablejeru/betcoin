import { calculatePoint } from "../utils";

describe("test Point calculation", () => {
  it("should return 1 then price is higher and bet was up", () => {
    const point = calculatePoint("UP", 11.0, 12.0);
    expect(point).toBe(1);
  });

  it("should return 1 then price is lower and the bet was down", () => {
    const point = calculatePoint("DOWN", 10.0, 9.0);
    expect(point).toBe(1);
  });

  it("should return -1 then the price is higher and the bet was down", () => {
    const point = calculatePoint("DOWN", 10.0, 11.0);
    expect(point).toBe(-1);
  });

  it("should return -1 then the price is lower and the bet was up", () => {
    const point = calculatePoint("UP", 10.0, 9.0);
    expect(point).toBe(-1);
  });

  it("should return -1 then the price is the same and the bet was up", () => {
    const point = calculatePoint("UP", 10.0, 10.0);
    expect(point).toBe(-1);
  });

  it("should return -1 then the price is the same and the bet was down", () => {
    const point = calculatePoint("DOWN", 10.0, 10.0);
    expect(point).toBe(-1);
  });
});
