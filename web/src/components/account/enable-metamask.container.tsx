import React, { useContext, useEffect, useState } from "react";
import { LoginComponent } from "./login.component";
import { MetamaskContext } from "../../contexts/metamask.context";
import { message } from "antd";

export const EnableMetamaskContainer: React.FC = props => {
  const metamask = useContext(MetamaskContext);
  const [isEnabled, setEnabled] = useState(metamask.query.isEnabled);

  useEffect(() => {
    const subscription = metamask.query.isEnabled$.subscribe(setEnabled);
    return () => {
      subscription.unsubscribe();
    };
  }, [metamask.query.isEnabled$]);

  if (isEnabled) {
    return <>{props.children}</>;
  } else {
    return <LoginComponent onError={message.error} />;
  }
};
