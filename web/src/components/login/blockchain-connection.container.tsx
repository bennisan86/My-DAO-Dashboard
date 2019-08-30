import React from 'react';
import CanNotBlockchainComponent from './can-not-blockchain.component';
import LoginContainer from './login.container';

function browserProvider() {
  const w = window as any;
  return w.ethereum || (w.web3 && w.web3.currentProvider);
}

export const BlockchainConnectionContainer: React.FC = props => {
  const provider = browserProvider();
  if (provider) {
    return <LoginContainer provider={provider}>{props.children}</LoginContainer>;
  } else {
    return <CanNotBlockchainComponent />;
  }
};

export default BlockchainConnectionContainer;
