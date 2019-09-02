import React from 'react'
import { LoginView } from './login.view';

function isEnabled(provider: any) {
  return provider && provider.enable ? provider.selectedAddress : !!provider;
}

export class EnableMetamaskContainer extends React.Component<{availableProvider: any}> {
  state = {
    isEnabled: isEnabled(this.props.availableProvider),
    isProgress: false
  };

  onLogin () {
    if (!this.state.isProgress) {
      this.setState({
        isProgress: true
      })
      if (this.props.availableProvider.enable) {
        this.props.availableProvider.enable().then(() => {
          this.setState({
            isEnabled: true,
            isProgress: false
          })
        }).catch(() => {
          this.setState({
            isEnabled: false,
            isProgress: true
          })
        })
      } else {
        this.setState({
          isProgress: false
        })
      }
    }
  }

  render () {
    if (this.state.isEnabled) {
      return this.props.children
    } else {
      return <LoginView onLogin={this.onLogin.bind(this)} isProgress={this.state.isProgress} />
    }
  }
}
