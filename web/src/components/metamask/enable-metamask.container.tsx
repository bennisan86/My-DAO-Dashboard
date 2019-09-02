import React, { useState } from 'react';
import { isEnabled } from './helpers';
import { LoginContainer } from './login.container';

interface Props {
  availableProvider: any;
}

export const EnableMetamaskContainer: React.FunctionComponent<Props> = props => {
  const [enabled, setEnabled] = useState(isEnabled(props.availableProvider));

  if (enabled) {
    return <>props.children</>;
  } else {
    return <LoginContainer setEnabled={setEnabled} availableProvider={props.availableProvider} />;
  }
};
