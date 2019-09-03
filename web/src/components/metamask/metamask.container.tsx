import React  from 'react';
import { TetherContainer } from './tether.container';
import { CanNotBlockchainView } from './can-not-blockchain.view';
import { MetamaskProvider } from '../../services/metamask-provider';

export const MetamaskContainer: React.FC = props => {
  const provider = new MetamaskProvider()
  if (provider.isAvailable()) {
    return <TetherContainer provider={provider}>{props.children}</TetherContainer>;
  } else {
    return <CanNotBlockchainView />;
  }
};
