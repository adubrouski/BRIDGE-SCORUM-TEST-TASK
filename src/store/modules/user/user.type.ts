import { UserEntity } from "types/user.entity";
import {
  createAuthorizeAction,
  createAuthorizeFailureAction,
  createAuthorizeSuccessAction,
  createChargeWinningAction,
  createCheckAuthorizationAction,
  createLogoutAction,
  createWriteOffBetAction,
} from "store/modules/user/user.actions";

export interface UserSlice {
  isAuthorizationProceed: boolean;
  isAuthorized: boolean;
  user: UserEntity | null;
}

export interface ChargeWinningPayload {
  bet: number;
  coefficient: number;
}

export type UserActions =
  | ReturnType<typeof createAuthorizeAction>
  | ReturnType<typeof createAuthorizeSuccessAction>
  | ReturnType<typeof createAuthorizeFailureAction>
  | ReturnType<typeof createLogoutAction>
  | ReturnType<typeof createChargeWinningAction>
  | ReturnType<typeof createWriteOffBetAction>
  | ReturnType<typeof createCheckAuthorizationAction>;
