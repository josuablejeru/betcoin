import { Box } from "@chakra-ui/react";
import BetPlacer from "../components/betPlacer";
import { isEmpty } from "lodash";
import { CORSApi } from "../generated-sources/openapi/api";
import { useEffect } from "react";
import * as ls from "local-storage";

const Game = () => {
  useEffect(() => {
    createSession();
  }, []);

  return (
    <>
      <Box p={8}>
        <BetPlacer />
      </Box>
    </>
  );
};

const createSession = () => {
  const sessionId = ls.get<string>("SESSION_ID");

  if (isEmpty(sessionId)) {
    const api = new CORSApi();
    const response = api.sessionGet();
    response.then((e) => {
      console.log(e.data.sessionId);
      ls.set<string>("SESSION_ID", e.data.sessionId);
    });

    return;
  }

  console.debug("session found");
};

export default Game;
