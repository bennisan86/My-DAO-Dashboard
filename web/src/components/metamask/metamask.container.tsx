import React from 'react'
import CanNotBlockchainView from './can-not-blockchain.view';
import { EnableMetamaskContainer } from './enable-metamask.container';

export function availableProvider() {
  const w = window as any;
  return w.ethereum || (w.web3 && w.web3.currentProvider);
}

export class MetamaskContainer extends React.Component {
  render () {
    const provider = availableProvider()
    if (provider) {
      return <EnableMetamaskContainer availableProvider={provider}>{this.props.children}</EnableMetamaskContainer>
    } else {
      return <CanNotBlockchainView/>
    }
  }
}
