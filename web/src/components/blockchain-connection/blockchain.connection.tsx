import React from 'react';
import CanNotBlockchainComponent from './can-not-blockchain.component';
import LoginContainer from './login.container';

interface State {
  availableProvider: any;
  isConnected: boolean;
}

export function availableProvider() {
  const w = window as any;
  return w.ethereum || (w.web3 && w.web3.currentProvider);
}

export function isConnected() {
  const provider = availableProvider();
  return provider && provider.enable ? provider.selectedAddress : !!provider;
}

export async function enable(): Promise<void> {
  const provider = availableProvider()
  if (provider && provider.enable) {
    return provider.enable()
  } else if (provider) {

  }
}

export class BlockchainConnection extends React.PureComponent<{}, State> {
  state = {
    availableProvider: availableProvider(),
    isConnected: isConnected(),
  };

  async handleLogin(): Promise<void> {
    await this.state.availableProvider.enable()
    if (isConnected()) {
      this.setState({
        isConnected: true
      })
    }
  }

  render() {
    if (this.state.availableProvider) {
      if (this.state.isConnected) {
        return 'foo';
        // return <BlockchainContext.Provider value={}>
        //   Enabled
        // </BlockchainContext.Provider>
      } else {
        return <LoginContainer onLogin={this.handleLogin.bind(this)} />;
      }
    } else {
      return <CanNotBlockchainComponent />;
    }
  }
}

export default BlockchainConnection;
