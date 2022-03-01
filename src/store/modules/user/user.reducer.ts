import { UserActions, UserSlice } from "store/modules/user/user.type";
import { UserEntity } from "types/user.entity";
import {
  AUTHORIZE,
  AUTHORIZE_FAILURE,
  AUTHORIZE_SUCCESS,
  CHARGE_WINNINGS,
  LOGOUT,
  WRITE_OFF_BET,
} from "store/modules/user/user.constants";

const initialState: UserSlice = {
  isAuthorizationProceed: false,
  isAuthorized: false,
  user: null,
};

export const userReducer = (
  state = initialState,
  action: UserActions
): UserSlice => {
  switch (action.type) {
    case AUTHORIZE:
      return {
        ...state,
        isAuthorizationProceed: true,
      };
    case AUTHORIZE_SUCCESS:
      return {
        ...state,
        isAuthorizationProceed: false,
        isAuthorized: true,
        user: action.payload,
      };
    case AUTHORIZE_FAILURE:
      return { ...state, isAuthorizationProceed: false };
    case LOGOUT:
      return initialState;
    case WRITE_OFF_BET:
      return {
        ...state,
        user: {
          ...state.user,
          balance: state.user!.balance - action.payload,
        } as UserEntity,
      };
    case CHARGE_WINNINGS:
      return {
        ...state,
        user: {
          ...state.user,
          balance:
            state.user!.balance +
            action.payload.bet * action.payload.coefficient,
        } as UserEntity,
      };
    default:
      return state;
  }
};
