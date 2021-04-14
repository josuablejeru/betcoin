import { calculatePoint } from "../utils";

describe("test Point calculation", () => {
  it("should return -1", () => {
    const point = calculatePoint("UP", 11.0, 12.0);
    expect(point).toBe(1);
  });

  it("it should return 1", () => {
    const point = calculatePoint("DOWN", 10.0, 9.0);
    expect(point).toBe(-1);
  });
});
