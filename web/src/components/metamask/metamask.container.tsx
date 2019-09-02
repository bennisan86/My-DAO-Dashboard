import React from 'react';
import CanNotBlockchainView from './can-not-blockchain.view';
import { EnableMetamaskContainer } from './enable-metamask.container';
import { withProgress } from './withProgress.hoc';

export function availableProvider() {
  const w = window as any;
  return w.ethereum || (w.web3 && w.web3.currentProvider);
}

function isEnabled(provider: any) {
  return provider && provider.enable ? provider.selectedAddress : !!provider;
}

export class MetamaskContainer extends React.Component {
  render() {
    const provider = availableProvider();
    const EnableMetamask = withProgress(EnableMetamaskContainer);
    if (provider) {
      return (
        <EnableMetamask availableProvider={provider} isEnabled={isEnabled(provider)}>
          {this.props.children}
        </EnableMetamask>
      );
    } else {
      return <CanNotBlockchainView />;
    }
  }
}
