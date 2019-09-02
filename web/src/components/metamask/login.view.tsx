import React from 'react'

export class LoginView extends React.Component<{onLogin: () => void}> {
  render () {
    return (
      <>
        <p>You are not logged in</p>
        <button onClick={this.props.onLogin}>Connect</button>
      </>
    );
  }
}
