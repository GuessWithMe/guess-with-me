import { UserGetActionTypes } from "./get/types";
import { UserSignOutSuccessAction } from "./signOut/types";

type UserActionTypes = UserSignOutSuccessAction | UserGetActionTypes;

export default UserActionTypes;
