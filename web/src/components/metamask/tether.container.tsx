import React, { useState } from 'react';
import { LoginComponent } from './login.component';
import { MetamaskProvider } from '../../services/metamask-provider';
import { ITetherContext, TetherContext } from '../../contexts/tether.context';

interface Props {
  provider: MetamaskProvider;
}

export const TetherContainer: React.FunctionComponent<Props> = props => {
  const [tetherState, setTetherState] = useState<ITetherContext>({
    account: props.provider.account,
  });

  const enable = async () => {
    const account = await props.provider.enable();
    setTetherState({
      account,
    });
  };

  if (tetherState.account) {
    return <TetherContext.Provider value={tetherState}>{props.children}</TetherContext.Provider>;
  } else {
    return <LoginComponent enable={enable} />;
  }
};
