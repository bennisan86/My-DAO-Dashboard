import React from 'react';
import CanNotBlockchainView from './can-not-blockchain.view';
import { EnableMetamaskContainer } from './enable-metamask.container';
import { MetamaskProvider } from './metamask-provider';

export const MetamaskContainer: React.FC = props => {
  const provider = new MetamaskProvider();
  if (provider.isAvailable()) {
    return <EnableMetamaskContainer provider={provider}>{props.children}</EnableMetamaskContainer>;
  } else {
    return <CanNotBlockchainView />;
  }
};
