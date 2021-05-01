import { useState, createContext, useEffect } from "react";
import { CORSApi } from "../generated-sources/openapi/api";
import * as ls from "local-storage";

interface IProps {
  children: any;
}

export const ScoreContext = createContext([]);

export const ScoreProvider = (props: IProps) => {
  const [scoreValue, setScoreValue] = useState(0);

  useEffect(() => {
    const sessionId = ls.get<string>("SESSION_ID");
    const api = new CORSApi();
    const score = api.scoreSessionIdGet(sessionId);
    score
      .then((result) => {
        console.debug("initial request", result.data.score);
        setScoreValue(result.data.score);
      })
      .catch((result) => console.error(result));
  }, []);

  return (
    <ScoreContext.Provider value={[scoreValue, setScoreValue]}>
      {props.children}
    </ScoreContext.Provider>
  );
};
