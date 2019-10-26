import { UserContextProps } from "../schema";

const INITIAL_STATE: UserContextProps = {
  dislikedTalks: [],
  likedTalks: [],
  name: null,
  picture: null,
  signedIn: false,
  savedTalks: []
};

export default INITIAL_STATE;
