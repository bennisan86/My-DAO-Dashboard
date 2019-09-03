import React  from 'react';
import { EnableMetamaskContainer } from './enable-metamask.container';
import { CanNotBlockchainView } from './can-not-blockchain.view';
import { MetamaskProvider } from '../../services/metamask-provider';

export const MetamaskContainer: React.FC = props => {
  const provider = new MetamaskProvider()
  if (provider.isAvailable()) {
    return <EnableMetamaskContainer provider={provider}>{props.children}</EnableMetamaskContainer>;
  } else {
    return <CanNotBlockchainView />;
  }
};
