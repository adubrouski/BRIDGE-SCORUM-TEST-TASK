import React from "react";
import classes from "components/Header/Header.module.scss";
import Button from "components/Button/Button";
import logo from "assets/images/logo.png";
import { createLogoutAction } from "store/modules/user/user.actions";
import { useTypedDispatch, useTypedSelector } from "hooks";

function Header() {
  const dispatch = useTypedDispatch();
  const balance = useTypedSelector((state) => state.user.user!.balance);

  const handleLogout = () => {
    dispatch(createLogoutAction());
  };

  return (
    <header className={classes.header}>
      <div className={classes.headerContentWrapper}>
        <div className={classes.titleWrap}>
          <div className={classes.logoWrap}>
            <img src={logo} alt="logo" />
          </div>
          <h1>BRIDGE</h1>
        </div>
        <div className={classes.balanceInfo}>
          <span>Баланс: </span>
          <span>{balance}</span>
          <span>$</span>
        </div>
        <Button onClick={handleLogout}>Выйти</Button>
      </div>
    </header>
  );
}

export default Header;
