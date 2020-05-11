import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

import { State } from "redux/store/types";

import { Props } from "./types";

const RoutePrivate: FC<Props> = ({
  component: RouteComponent,
  componentProps,
  ...rest
}) => {
  const user = useSelector((state: State) => state.user);

  const renderComponent = useCallback(
    (props: RouteComponentProps) => {
      if (!RouteComponent) return null;

      return <RouteComponent {...props} {...componentProps} />;
    },
    [RouteComponent, componentProps]
  );

  if (!user) {
    return <Redirect to="/" />;
  }

  return <Route render={renderComponent} {...rest} />;
};

export default RoutePrivate;
