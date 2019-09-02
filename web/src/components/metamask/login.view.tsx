import React from 'react'

export class LoginView extends React.PureComponent<{onLogin: () => void, isProgress: boolean}> {
  renderButton () {
    if (this.props.isProgress) {
      return <button>Loading...</button>
    } else {
      return <button onClick={this.props.onLogin}>Connect</button>
    }
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
