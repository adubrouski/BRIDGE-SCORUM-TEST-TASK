import React, { useEffect } from "react";
import { createCheckAuthorizationAction } from "store/modules/user/user.actions";
import "./App.scss";
import { useRoutes, useTypedDispatch, useTypedSelector } from "hooks";

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
