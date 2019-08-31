import React from 'react';
import CanNotBlockchainComponent from './can-not-blockchain.component';
import LoginContainer from './login.container';

interface State {
  availableProvider: any;
  isConnected: boolean;
}

export function nextState(): State {
  const w = window as any;
  const provider = w.ethereum || (w.web3 && w.web3.currentProvider);
  const isConnected = provider && provider.enable ? provider.selectedAddress : !!provider;
  return {
    availableProvider: provider,
    isConnected: isConnected,
  };
}

export class BlockchainConnection extends React.PureComponent<{}, State> {
  state = nextState();

  checkConnected() {
    const next = nextState()
    return this.setState(next);
  }

  render() {
    if (this.state.availableProvider) {
      if (this.state.isConnected) {
        return 'foo'
        // return <BlockchainContext.Provider value={}>
        //   Enabled
        // </BlockchainContext.Provider>
      } else {
        return <LoginContainer availableProvider={this.state.availableProvider} onEnabled={this.checkConnected.bind(this)} />;
      }
    } else {
      return <CanNotBlockchainComponent />;
    }
  }
}

export default BlockchainConnection;
