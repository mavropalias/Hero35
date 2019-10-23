import { UserContextProps } from "../schema";

const INITIAL_STATE: UserContextProps = {
  name: null,
  picture: null,
  signedIn: false,
  savedTalks: []
};

export default INITIAL_STATE;
