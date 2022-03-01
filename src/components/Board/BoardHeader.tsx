import React from "react";
import classes from "components/Board/Board.module.scss";
import { ResultEnum } from "store/modules/cards/cards.enum";
import InputLabel from "components/Input/InputLabel";
import InputTypeNumber from "components/Input/InputNumber";
import Button from "components/Button/Button";
import { createReplayAction } from "store/modules/cards/cards.actions";
import classNames from "classnames";
import { useTypedDispatch, useTypedSelector } from "hooks";
import BetConstantsPanel from "components/BetConstantsPanel/BetConstantsPanel";

interface BoardHeaderProps {
  betValue?: number;
  onBetValueChange: (bet: number, isConstant?: boolean) => void;
}

function BoardHeader({ betValue, onBetValueChange }: BoardHeaderProps) {
  const { result, bet, coefficient } = useTypedSelector((state) => ({
    result: state.cards.currentGame.result,
    bet: state.cards.currentGame.bet,
    coefficient: state.cards.winningCoefficient,
  }));
  const { balance } = useTypedSelector((state) => ({
    balance: state.user.user!.balance,
  }));
  const dispatch = useTypedDispatch();

  const renderResult = (gameResult: ResultEnum) => {
    const className = classNames(classes.label, {
      [classes.winning]: gameResult === ResultEnum.Winning,
      [classes.defeat]: gameResult === ResultEnum.Defeat,
      [classes.draw]: gameResult === ResultEnum.Draw,
    });

    if (gameResult === ResultEnum.Draw) {
      return <span className={className}>Ничья, ставка возвращена</span>;
    }

    if (gameResult === ResultEnum.Winning) {
      return (
        <span className={className}>
          Вы выйграли {(bet! * coefficient).toFixed(2)}
          <span>$</span>
        </span>
      );
    }

    if (gameResult === ResultEnum.Defeat) {
      return <span className={className}>Вы проиграли :(</span>;
    }

    return undefined;
  };

  return (
    <div className={classes.upperSection}>
      {result === ResultEnum.NotDefined ? (
        <>
          <div className={classes.label}>Кто выйграет?</div>
          <div>
            <InputLabel
              labelContent="Ваша ставка:"
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <InputTypeNumber
                name="bet"
                min={0.01}
                max={balance}
                onChange={onBetValueChange}
                value={betValue}
              />
            </InputLabel>
            <BetConstantsPanel
              onChange={(value) => onBetValueChange(value, true)}
            />
          </div>
        </>
      ) : (
        renderResult(result)
      )}
      {result !== ResultEnum.NotDefined && (
        <div>
          <Button
            onClick={() => {
              dispatch(createReplayAction());
            }}
          >
            Сыграть еще
          </Button>
        </div>
      )}
    </div>
  );
}

export default BoardHeader;
