import { combineReducers } from "redux";
import { userReducer } from "store/modules/user/user.reducer";
import { cardsReducer } from "store/modules/cards/cards.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cards: cardsReducer,
});
