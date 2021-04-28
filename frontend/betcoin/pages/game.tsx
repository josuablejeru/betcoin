import { Box } from "@chakra-ui/react";
import BetPlacer from "../components/betPlacer";
import { useCookies } from "react-cookie";
import { isEmpty } from "lodash";
import { DefaultApi } from "../generated-sources/openapi/api";
import {useEffect} from "react";

const Game = () => {
  const [cookies, setCookie] = useCookies(["SESSION_ID"]);
  useEffect(() => {
    createSession(cookies, setCookie);
  });

  return (
    <>
      <Box p={8}>
        <BetPlacer />
      </Box>
    </>
  );
};

const createSession = (state, setter: any) => {
  if (isEmpty(state)) {
    const api = new DefaultApi();
    const response = api.sessionGet();
    const cookie = response.then(e => console.debug("cookie promis",e));
    console.log("cookie", cookie);
    return;
  }

  console.debug("cookie found");
};

export default Game;
