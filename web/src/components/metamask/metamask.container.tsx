import React from 'react'
import CanNotBlockchainView from './can-not-blockchain.view';
import { LoginContainer } from './login.container';

export function availableProvider() {
  const w = window as any;
  return w.ethereum || (w.web3 && w.web3.currentProvider);
}

export class MetamaskContainer extends React.Component {
  render () {
    const provider = availableProvider()
    if (provider) {
      return <LoginContainer availableProvider={provider}>{this.props.children}</LoginContainer>
    } else {
      return <CanNotBlockchainView/>
    }
  }
}
