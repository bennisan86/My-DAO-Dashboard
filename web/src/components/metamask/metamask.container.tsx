import React, { useContext } from 'react';
import { EnableMetamaskContainer } from './enable-metamask.container';
import { CanNotBlockchainView } from './can-not-blockchain.view';
import { MetamaskContext } from '../../contexts/metamask.context';

export const MetamaskContainer: React.FC = props => {
  const provider = useContext(MetamaskContext);
  if (provider.isAvailable()) {
    return <EnableMetamaskContainer>{props.children}</EnableMetamaskContainer>;
  } else {
    return <CanNotBlockchainView />;
  }
};
