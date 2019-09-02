import React from 'react'

export class LoginView extends React.PureComponent<{onLogin: () => void}> {
  renderButton () {
    return <button onClick={this.props.onLogin}>Connect</button>
  }

  render () {
    return (
      <>
        <p>You are not logged in</p>
        {this.renderButton()}
      </>
    );
  }
}
