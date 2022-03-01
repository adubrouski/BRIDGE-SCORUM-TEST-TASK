import {
  ReduxActionWithoutPayload,
  RequiredReduxAction,
} from "store/store.types";
import { UserCredentials } from "services/auth.service";
import {
  AUTHORIZE,
  AUTHORIZE_FAILURE,
  AUTHORIZE_SUCCESS,
  CHARGE_WINNINGS,
  CHECK_AUTHORIZATION,
  LOGOUT,
  WRITE_OFF_BET,
} from "store/modules/user/user.constants";
import { UserEntity } from "types/user.entity";
import { ChargeWinningPayload } from "store/modules/user/user.type";

export const createAuthorizeAction = ({
  username,
  password,
}: UserCredentials): RequiredReduxAction<
  typeof AUTHORIZE,
  UserCredentials
> => ({
  type: AUTHORIZE,
  payload: {
    username,
    password,
  },
});

export const createAuthorizeSuccessAction = (
  user: UserEntity
): RequiredReduxAction<typeof AUTHORIZE_SUCCESS, UserEntity> => ({
  type: AUTHORIZE_SUCCESS,
  payload: user,
});

export const createAuthorizeFailureAction = (): ReduxActionWithoutPayload<
  typeof AUTHORIZE_FAILURE
> => ({
  type: AUTHORIZE_FAILURE,
});

export const createLogoutAction = (): ReduxActionWithoutPayload<
  typeof LOGOUT
> => ({ type: LOGOUT });

export const createWriteOffBetAction = (
  bet: number
): RequiredReduxAction<typeof WRITE_OFF_BET, number> => ({
  type: WRITE_OFF_BET,
  payload: bet,
});

export const createChargeWinningAction = (
  payload: ChargeWinningPayload
): RequiredReduxAction<typeof CHARGE_WINNINGS, ChargeWinningPayload> => ({
  type: CHARGE_WINNINGS,
  payload,
});

export const createCheckAuthorizationAction = (): ReduxActionWithoutPayload<
  typeof CHECK_AUTHORIZATION
> => ({
  type: CHECK_AUTHORIZATION,
});
