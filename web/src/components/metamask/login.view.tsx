import React from 'react';

interface Props {
  onLogin: () => void;
  isProgress: boolean;
  error: string | undefined;
}

export class LoginView extends React.PureComponent<Props> {
  renderButton() {
    if (this.props.isProgress) {
      return <button disabled={true}>Waiting...</button>;
    } else {
      return <button onClick={this.props.onLogin}>Connect</button>;
    }
  }

  renderError() {
    if (this.props.error) {
      return <p>{this.props.error}</p>;
    } else {
      return undefined;
    }
  }

  render() {
    return (
      <>
        <p>You are not logged in</p>
        {this.renderError()}
        {this.renderButton()}
      </>
    );
  }
}