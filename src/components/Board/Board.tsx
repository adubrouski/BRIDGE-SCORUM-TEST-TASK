import React, { useRef, useState } from "react";
import classes from "components/Board/Board.module.scss";
import Card from "components/Card/Card";
import Button from "components/Button/Button";
import { createWriteOffBetAction } from "store/modules/user/user.actions";
import { createSelectCardAction } from "store/modules/cards/cards.actions";
import { ResultEnum } from "store/modules/cards/cards.enum";
import { v4 } from "uuid";
import BoardHeader from "components/Board/BoardHeader";
import { useTypedDispatch, useTypedSelector } from "hooks";
import Preloader from "components/Preloader/Preloader";

function Board() {
  const { cards, result, isCardFetching } = useTypedSelector((state) => ({
    cards: state.cards.cards,
    result: state.cards.currentGame.result,
    isCardFetching: state.cards.isCardsFetching,
  }));
  const dispatch = useTypedDispatch();
  const timeout = useRef<number | undefined>(undefined);

  const [betValue, setBetValue] = useState<number | undefined>(undefined);

  const handleBetChange = (value: number, isConstant: boolean = false) => {
    if (isConstant) {
      setBetValue(value);
      return;
    }

    clearTimeout(timeout.current);

    timeout.current = window.setTimeout(() => {
      setBetValue(value);
    }, 150);
  };

  const handleSelectCard = (index: number) => () => {
    dispatch(
      createSelectCardAction({
        cardIndex: index,
        bet: betValue!,
      })
    );
    dispatch(createWriteOffBetAction(betValue!));
    setBetValue(undefined);
  };

  return (
    <>
      <BoardHeader onBetValueChange={handleBetChange} betValue={betValue} />
      <div className={classes.board}>
        {isCardFetching ? (
          <div className={classes.preloaderWrap}>
            <Preloader size="large" />
          </div>
        ) : (
          cards.map((item, index) => (
            <div className={classes.cardWrapper} key={v4()}>
              <Card
                active={!item.isHidden}
                image={item.image}
                onClick={handleSelectCard(index)}
                disabled={result !== ResultEnum.NotDefined || !betValue}
              />
              <div>
                {result === ResultEnum.NotDefined && (
                  <Button
                    disabled={!betValue}
                    onClick={handleSelectCard(index)}
                  >
                    Эта карта!
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Board;
