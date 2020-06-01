import React, { FC, useCallback, memo } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Props } from "./types";
import userAtoms from "recoil/atoms/user";

const RoutePrivate: FC<Props> = memo(
  ({ component: RouteComponent, componentProps, ...rest }) => {
    const me = useRecoilValue(userAtoms.me);
    const renderComponent = useCallback(
      (props: RouteComponentProps) => {
        if (!RouteComponent) return null;

        return <RouteComponent {...props} {...componentProps} />;
      },
      [RouteComponent, componentProps]
    );

    if (!me) {
      return <Redirect to="/" />;
    }

    return <Route render={renderComponent} {...rest} />;
  }
);

export default RoutePrivate;
