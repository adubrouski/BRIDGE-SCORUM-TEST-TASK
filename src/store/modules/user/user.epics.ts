import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { EMPTY, from, of, OperatorFunction } from "rxjs";
import { toast } from "react-hot-toast";
import { Epic, ofType } from "redux-observable";
import AuthService from "services/auth.service";
import { UserEntity } from "types/user.entity";
import {
  AUTHORIZE,
  CHECK_AUTHORIZATION,
  LOGOUT,
} from "store/modules/user/user.constants";
import {
  createAuthorizeAction,
  createAuthorizeFailureAction,
  createAuthorizeSuccessAction,
} from "store/modules/user/user.actions";
import { UserActions } from "store/modules/user/user.type";

export const loginEpic: Epic<UserActions, UserActions> = (action$) =>
  action$.pipe(
    ofType(AUTHORIZE) as OperatorFunction<
      UserActions,
      ReturnType<typeof createAuthorizeAction>
    >,
    mergeMap((action: ReturnType<typeof createAuthorizeAction>) =>
      from(
        AuthService.login({
          username: action.payload.username,
          password: action.payload.password,
        })
      ).pipe(
        tap(() => {
          localStorage.setItem("isAuthorized", "true");
        }),
        map((user: UserEntity) => createAuthorizeSuccessAction(user)),
        catchError((error) => {
          toast.error(error.message);

          return of(createAuthorizeFailureAction());
        })
      )
    )
  );

export const checkAuthorization: Epic<UserActions, UserActions> = (action$) =>
  action$.pipe(
    ofType(CHECK_AUTHORIZATION),
    mergeMap(() => {
      if (localStorage.getItem("isAuthorized")) {
        return of(createAuthorizeSuccessAction(AuthService.mockUser));
      }

      return EMPTY;
    })
  );

export const logoutEpic: Epic<UserActions, UserActions> = (action$) =>
  action$.pipe(
    ofType(LOGOUT),
    tap(() => {
      localStorage.removeItem("isAuthorized");
    }),
    mergeMap(() => EMPTY)
  );
