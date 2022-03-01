import React, { useEffect } from "react";
import { useRoutes } from "routes/useRoutes";
import { useTypedSelector } from "hooks/useTypedSelector.hook";
import { useTypedDispatch } from "hooks/useTypedDispatch.hook";
import { createCheckAuthorizationAction } from "store/modules/user/user.actions";
import "./App.scss";

function App() {
  const { isAuthorized } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const routes = useRoutes(isAuthorized);

  useEffect(() => {
    dispatch(createCheckAuthorizationAction());
  }, []);

  return <div className="app-wrapper">{routes}</div>;
}

export default App;
