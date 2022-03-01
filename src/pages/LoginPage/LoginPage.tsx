import React, { FormEvent, useState } from "react";
import Button from "components/Button/Button";
import { useTypedDispatch } from "hooks/useTypedDispatch.hook";
import { useTypedSelector } from "hooks/useTypedSelector.hook";
import { createAuthorizeAction } from "store/modules/user/user.actions";
import logo from "assets/images/logo.png";
import { UserCredentials } from "services/auth.service";
import { toast } from "react-hot-toast";
import InputPassword from "components/Input/InputPassword";
import classes from "./LoginPage.module.scss";
import Input from "../../components/Input/Input";
import InputLabel from "../../components/Input/InputLabel";

const DEFAULT_CREDENTIALS_STATE: UserCredentials = {
  username: "",
  password: "",
};

function LoginPage() {
  const { isAuthorizationProceed } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  const [credentials, setCredentials] = useState<UserCredentials>(
    DEFAULT_CREDENTIALS_STATE
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password } = credentials;

    if (!username || !password) {
      return toast.error("Заполните обязательные поля");
    }

    return dispatch(createAuthorizeAction({ username, password }));
  };

  const handleUsernameChange = (username: string) => {
    setCredentials((prevState) => ({ ...prevState, username }));
  };

  const handlePasswordChange = (password: string) => {
    setCredentials((prevState) => ({ ...prevState, password }));
  };

  return (
    <div className={classes.loginPageWrap}>
      <img src={logo} className={classes.logo} alt="logo" />
      <form className={classes.loginPageForm} onSubmit={handleSubmit}>
        <InputLabel labelContent="Введите логин:">
          <Input
            name="username"
            onChange={handleUsernameChange}
            value={credentials.username}
          />
        </InputLabel>
        <InputLabel labelContent="Введите пароль:">
          <InputPassword
            name="password"
            onChange={handlePasswordChange}
            value={credentials.password}
          />
        </InputLabel>
        <Button isLoading={isAuthorizationProceed}>Войти</Button>
      </form>
    </div>
  );
}

export default LoginPage;
