import { CORSApi, NewGuessRequest } from "../generated-sources/openapi/";
import { NewGuessRequestGuessEnum } from "../generated-sources/openapi";
import { calculatePoint } from "../utils";

export class GuessRequest {
  private sessionId: string;
  private btc_before: number;
  private btc_after: number;
  private bet: NewGuessRequestGuessEnum;
  private point: number;
  private api: CORSApi;

  public constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.api = new CORSApi();
  }

  public setFormData(data: FormData): void {
    this.bet = data.get("bet") as NewGuessRequestGuessEnum;
  }

  public setBtcBefore(coinValue: number) {
    this.btc_before = clone(coinValue);
  }

  public setBtcAfter(coinValue: number) {
    this.btc_after = coinValue;
  }

  public resolve(setScore: (n: number) => void): void {
    this.point = calculatePoint(this.bet, this.btc_before, this.btc_after);

    const data: NewGuessRequest = {
      sessionId: this.sessionId,
      point: this.point,
      guess: this.bet,
    };

    console.debug(data);

    this.api
      .storeGuess(data)
      .then((e) => {
        setScore(e.data.score);
      })
      .catch((e) => console.error(e));
  }
}
