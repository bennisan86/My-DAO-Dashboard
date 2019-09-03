import React, { useState } from 'react';
import { LoginComponent } from './login.component';
import { MetamaskProvider } from '../../services/metamask-provider';
import { TetherContext } from '../../contexts/tether.context';

interface Props {
  provider: MetamaskProvider;
}

export const TetherContainer: React.FunctionComponent<Props> = props => {
  const [tetherState, setTetherState] = useState({
    account: props.provider.account,
    provider: props.provider.upstream,
  });

  const enable = async () => {
    await props.provider.enable();
    setTetherState({
      account: props.provider.account,
      provider: props.provider.upstream,
    });
  };

  if (tetherState.account) {
    return <TetherContext.Provider value={tetherState}>{props.children}</TetherContext.Provider>;
  } else {
    return <LoginComponent enable={enable} />;
  }
};
