import { CORSApi, NewGuess } from "../generated-sources/openapi/";
import { NewGuessGuessEnum } from "../generated-sources/openapi";
import { calculatePoint } from "../utils";

export class GuessRequest {
  private userId: string;
  private btc_set: number;
  private btc_after: number;
  private bet: NewGuessGuessEnum;
  private point: number;
  private api: CORSApi;

  public constructor(userId: string) {
    this.userId = userId;
    this.api = new CORSApi();
  }

  public setFormData(data: FormData): void {
    this.bet = data.get("bet") as NewGuessGuessEnum;
    this.btc_set = (data.get("coinValue") as unknown) as number;
  }

  public setBtcAfter(coinValue: number) {
    this.btc_after = coinValue;
  }

  public resolve(setScore: (n: number) => void) {
    this.point = calculatePoint(this.bet, this.btc_set, this.btc_after);

    const data: NewGuess = {
      userId: this.userId,
      point: this.point,
      guess: this.bet,
    };

    this.api.storeGuess(data).then((e) => {
      setScore(e.data.score);
      console.debug("response", e.data.guessId);
    }).catch(e => console.error(e));
  }
}
