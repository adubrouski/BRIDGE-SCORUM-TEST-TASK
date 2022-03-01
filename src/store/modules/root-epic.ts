import { combineEpics } from "redux-observable";
import {
  checkAuthorization,
  loginEpic,
  logoutEpic,
} from "store/modules/user/user.epics";
import {
  fetchCardsEpic,
  getGameResultEpic,
} from "store/modules/cards/cards.epics";

export const rootEpic = combineEpics<any>(
  loginEpic,
  logoutEpic,
  checkAuthorization,
  fetchCardsEpic,
  getGameResultEpic
);
