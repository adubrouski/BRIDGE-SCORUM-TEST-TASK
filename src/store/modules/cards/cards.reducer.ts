import { CardsActions, CardsSlice } from "store/modules/cards/cards.type";
import { ResultEnum } from "store/modules/cards/cards.enum";
import {
  REPLAY,
  SELECT_CARD,
  SET_RESULT,
  SHOW_CARDS,
} from "store/modules/cards/cards.constants";

const initialState: CardsSlice = {
  cards: [
    { isHidden: true, image: null, value: NaN },
    { isHidden: true, image: null, value: NaN },
  ],
  winningCoefficient: 2,
  currentGame: {
    selectedCard: undefined,
    bet: undefined,
    result: ResultEnum.NotDefined,
  },
};

export const cardsReducer = (
  state = initialState,
  action: CardsActions
): CardsSlice => {
  switch (action.type) {
    case SELECT_CARD:
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          selectedCard: action.payload.cardIndex,
          bet: action.payload.bet,
        },
      };
    case SHOW_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case SET_RESULT: {
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          result: action.payload,
        },
      };
    }
    case REPLAY:
      return initialState;
    default:
      return state;
  }
};
