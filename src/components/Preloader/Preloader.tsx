import React from "react";
import classNames from "classnames";
import classes from "components/Preloader/Preloader.module.scss";

interface PreloaderProps {
  size?: "small" | "medium" | "large";
}

function Preloader({ size = "small" }: PreloaderProps) {
  const composedClassName = classNames(classes.preloader, {
    [classes.mediumSize]: size === "medium",
    [classes.largeSize]: size === "large",
  });

  return <span className={composedClassName} />;
}

export default Preloader;
