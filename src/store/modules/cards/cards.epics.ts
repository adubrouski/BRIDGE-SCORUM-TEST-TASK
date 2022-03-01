import { Epic, ofType } from "redux-observable";
import { catchError, mergeMap } from "rxjs/operators";
import { EMPTY, from, Observable, OperatorFunction } from "rxjs";
import { BridgeService } from "services";
import {
  GET_GAME_RESULT,
  SELECT_CARD,
} from "store/modules/cards/cards.constants";
import {
  createGetGameResultAction,
  createSelectCardAction,
  createSetResultAction,
  createShowCardsAction,
} from "store/modules/cards/cards.actions";
import { ResultEnum } from "store/modules/cards/cards.enum";
import { CardsActions } from "store/modules/cards/cards.type";
import { CardEntity } from "types/card.entity";
import { createChargeWinningAction } from "store/modules/user/user.actions";
import { toast } from "react-hot-toast";
import { UserActions } from "store/modules/user/user.type";
import { StoreType } from "store/modules/root-reducer";

export const fetchCardsEpic: Epic<CardsActions, CardsActions> = (action$) =>
  action$.pipe(
    ofType(SELECT_CARD) as OperatorFunction<
      CardsActions,
      ReturnType<typeof createSelectCardAction>
    >,
    mergeMap(
      (
        action: ReturnType<typeof createSelectCardAction>
      ): Observable<CardsActions> =>
        from(BridgeService.getWinner()).pipe(
          mergeMap((cards: CardEntity[]) =>
            from([
              createShowCardsAction(cards),
              createGetGameResultAction({
                bet: action.payload.bet,
                cardIndex: action.payload.cardIndex,
                cards,
              }),
            ])
          ),
          catchError((error) => {
            toast.error(error.message);

            return EMPTY;
          })
        )
    )
  );

export const getGameResultEpic: Epic<CardsActions, CardsActions, StoreType> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType(GET_GAME_RESULT) as OperatorFunction<
      CardsActions,
      ReturnType<typeof createGetGameResultAction>
    >,
    mergeMap(
      (
        action: ReturnType<typeof createGetGameResultAction>
      ): Observable<CardsActions> => {
        const { cards } = action.payload;
        let result: ResultEnum = ResultEnum.NotDefined;
        const selectedCardIndex = action.payload.cardIndex;
        const selectedCard = cards[selectedCardIndex];

        for (let index = 0; index < cards.length; index += 1) {
          if (index !== selectedCardIndex) {
            if (cards[index].value === selectedCard.value) {
              result = ResultEnum.Draw;
              break;
            }

            if (cards[index].value > selectedCard.value) {
              result = ResultEnum.Defeat;
              break;
            }

            result = ResultEnum.Winning;
          }
        }

        const actions: (CardsActions | UserActions)[] = [
          createSetResultAction(result),
        ];

        if (result === ResultEnum.Winning || result === ResultEnum.Draw) {
          actions.push(
            createChargeWinningAction({
              bet: action.payload.bet,
              coefficient:
                result === ResultEnum.Winning
                  ? state$.value.cards.winningCoefficient
                  : 1,
            })
          );
        }

        return from(actions as CardsActions[]);
      }
    )
  );
