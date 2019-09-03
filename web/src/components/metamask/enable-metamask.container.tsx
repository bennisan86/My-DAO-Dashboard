import React, { useState } from 'react';
import { LoginComponent } from './login.component';
import { MetamaskProvider } from '../../services/metamask-provider';

interface Props {
  provider: MetamaskProvider
}

export const EnableMetamaskContainer: React.FunctionComponent<Props> = props => {
  const [enabled, setEnabled] = useState(props.provider.isEnabled());

  const enable = async () => {
    await props.provider.enable()
    setEnabled(props.provider.isEnabled())
  };

  if (enabled) {
    return <>props.children</>;
  } else {
    return <LoginComponent enable={enable} />;
  }
};
