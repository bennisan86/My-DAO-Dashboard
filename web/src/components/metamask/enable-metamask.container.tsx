import React, { useState } from 'react';
import { LoginComponent } from './login.component';
import { MetamaskProvider } from './metamask-provider';

interface Props {
  provider: MetamaskProvider;
}

export const EnableMetamaskContainer: React.FunctionComponent<Props> = props => {
  const [enabled, setEnabled] = useState(props.provider.isEnabled());

  if (enabled) {
    return <>props.children</>;
  } else {
    return <LoginComponent setEnabled={setEnabled} provider={props.provider} />;
  }
};
