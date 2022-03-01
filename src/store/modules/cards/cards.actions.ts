import {
  ReduxActionWithoutPayload,
  RequiredReduxAction,
} from "store/store.types";
import {
  GET_GAME_RESULT,
  REPLAY,
  SELECT_CARD,
  SET_RESULT,
  SHOW_CARDS,
} from "store/modules/cards/cards.constants";
import { CardEntity } from "types/card.entity";
import { ResultEnum } from "store/modules/cards/cards.enum";
import {
  GetGameResultActionPayload,
  SelectCardActionPayload,
} from "store/modules/cards/cards.type";

export const createSelectCardAction = (
  payload: SelectCardActionPayload
): RequiredReduxAction<typeof SELECT_CARD, SelectCardActionPayload> => ({
  type: SELECT_CARD,
  payload,
});

export const createShowCardsAction = (
  cards: CardEntity[]
): RequiredReduxAction<typeof SHOW_CARDS, CardEntity[]> => ({
  type: SHOW_CARDS,
  payload: cards,
});

export const createSetResultAction = (
  result: ResultEnum
): RequiredReduxAction<typeof SET_RESULT, ResultEnum> => ({
  type: SET_RESULT,
  payload: result,
});

export const createReplayAction = (): ReduxActionWithoutPayload<
  typeof REPLAY
> => ({
  type: REPLAY,
});

export const createGetGameResultAction = (
  payload: GetGameResultActionPayload
): RequiredReduxAction<typeof GET_GAME_RESULT, GetGameResultActionPayload> => ({
  type: GET_GAME_RESULT,
  payload,
});
