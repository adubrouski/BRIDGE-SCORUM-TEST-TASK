import { CardEntity } from "types/card.entity";
import { ResultEnum } from "store/modules/cards/cards.enum";
import {
  createGetGameResultAction,
  createReplayAction,
  createSelectCardAction,
  createSetResultAction,
  createShowCardsAction,
} from "store/modules/cards/cards.actions";

export interface CardsSlice {
  isCardsFetching: boolean;
  cards: CardEntity[];
  winningCoefficient: number;
  currentGame: {
    selectedCard: number | undefined;
    bet: number | undefined;
    result: ResultEnum;
  };
}

export interface SelectCardActionPayload {
  bet: number;
  cardIndex: number;
}

export interface GetGameResultActionPayload extends SelectCardActionPayload {
  cards: CardEntity[];
}

export type CardsActions =
  | ReturnType<typeof createSelectCardAction>
  | ReturnType<typeof createShowCardsAction>
  | ReturnType<typeof createSetResultAction>
  | ReturnType<typeof createReplayAction>
  | ReturnType<typeof createGetGameResultAction>;
