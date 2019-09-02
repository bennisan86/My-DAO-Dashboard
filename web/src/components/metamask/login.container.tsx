import React from 'react'
import { LoginView } from './login.view';

export class LoginContainer extends React.Component<{availableProvider: any}> {
  state = {
    isEnabled: false
  };

  onLogin () {
    console.log('onLogin')
  }

  render () {
    if (this.state.isEnabled) {
      return this.props.children
    } else {
      return <LoginView onLogin={this.onLogin.bind(this)} />
    }
  }
}
