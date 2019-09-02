import React from 'react';
import { LoginView } from './login.view';

function isEnabled(provider: any) {
  return provider && provider.enable ? provider.selectedAddress : !!provider;
}

export class EnableMetamaskContainer extends React.Component<{ availableProvider: any }> {
  state = {
    isEnabled: isEnabled(this.props.availableProvider),
  };

  async onLogin() {
    if (this.props.availableProvider.enable) {
      try {
        await this.props.availableProvider.enable();
        this.setState({
          isEnabled: true,
        });
      } catch (e) {
        this.setState({
          isEnabled: false,
        });
      }
    }
  }

  render() {
    if (this.state.isEnabled) {
      return this.props.children;
    } else {
      return <LoginView onLogin={this.onLogin.bind(this)} />;
    }
  }
}
