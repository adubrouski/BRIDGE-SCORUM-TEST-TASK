import React from "react";
import Button from "components/Button/Button";
import { v4 } from "uuid";
import classes from "components/BetConstantsPanel/BetConstantsPanel.module.scss";
import appConfig from "../../app-config.json";

interface BetConstantsPanelProps {
  onChange?: (value: number) => void;
}

function BetConstantsPanel({ onChange }: BetConstantsPanelProps) {
  const handleButtonClick = (value: number) => () => {
    if (onChange) onChange(value);
  };

  return (
    <div className={classes.panelWrap}>
      {appConfig.betConstants.map((item) => (
        <Button key={v4()} onClick={handleButtonClick(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
}

export default BetConstantsPanel;
