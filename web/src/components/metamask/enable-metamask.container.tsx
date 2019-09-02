import React, { useContext, useState } from 'react';
import { LoginComponent } from './login.component';
import { MetamaskContext } from '../../contexts/metamask.context';

export const EnableMetamaskContainer: React.FunctionComponent = props => {
  const provider = useContext(MetamaskContext);
  const [enabled, setEnabled] = useState(provider.isEnabled());

  if (enabled) {
    return <>props.children</>;
  } else {
    return <LoginComponent setEnabled={setEnabled} />;
  }
};
