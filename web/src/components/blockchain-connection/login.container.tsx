import React from 'react';
import Loader from '../Layout/Loader/Loader';

interface Props {
  onLogin: () => Promise<void>
}

interface State {
  isProgress: boolean;
  error: string | undefined;
}

export default class LoginContainer extends React.PureComponent<Props, State> {
  state = {
    isProgress: false,
    error: undefined,
  };

  async handleClick() {
    if (!this.state.isProgress) {
      try {
        this.setState({ isProgress: true });
        await this.props.onLogin()
      } catch (e) {
        this.setState({
          isProgress: false,
          error: e.message,
        });
      }
      // if (this.props.availableProvider && this.props.availableProvider.enable) {
      //   this.setState({ isProgress: true });
      //   try {
      //     await this.props.availableProvider.enable();
      //     this.setState({ isProgress: false });
      //     this.props.onEnabled();
      //   } catch (e) {
      //     this.setState({
      //       isProgress: false,
      //       error: 'Connection disabled. Please, try again',
      //     });
      //   }
      // }
    }
  }

  render() {
    if (this.state.isProgress) {
      return <Loader/>
    } else {
      return (
        <>
          <p>You are not logged in</p>
          {this.state.error}
          <button onClick={this.handleClick.bind(this)}>Connect</button>
        </>
      );
    }
  }
}
