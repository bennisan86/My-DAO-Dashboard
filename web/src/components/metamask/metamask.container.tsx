import React from 'react';
import CanNotBlockchainView from './can-not-blockchain.view';
import { EnableMetamaskContainer } from './enable-metamask.container';
import { availableProvider } from './helpers';

export const MetamaskContainer: React.FC = (props) => {
  const provider = availableProvider();
  if (provider) {
    return (
      <EnableMetamaskContainer availableProvider={provider}>
        {props.children}
      </EnableMetamaskContainer>
    );
  } else {
    return <CanNotBlockchainView />;
  }
};
