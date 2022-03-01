import React from "react";
import classes from "pages/ErrorPage/ErrorPage.module.scss";

function ErrorPage() {
  return (
    <div className={classes.errorPageWrap}>
      <h2>Неизвестная ошибка</h2>
    </div>
  );
}

export default ErrorPage;
