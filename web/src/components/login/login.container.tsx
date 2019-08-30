import React from 'react';
import { State } from '../../redux/store';
import { connect } from 'react-redux';
import * as account from '../../redux/account.redux';
import { Mutex } from 'await-semaphore';
import { Provider } from 'web3/providers';
import { providers } from 'ethers';
import { AsyncSendable } from 'ethers/providers';
import { Dispatch } from 'redux';

interface PassedProps {
  provider: Provider;
}

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  setAddress: (address: string) => void;
}

type Props = StateProps & DispatchProps & PassedProps;

interface LoginContainerState {
  error: string | undefined,
  inProgress: boolean
}

export class LoginContainer extends React.Component<Props, LoginContainerState> {
  private mutex = new Mutex();
  state = {
    error: undefined,
    inProgress: false
  };

  async handleClick() {
    if (!this.state.inProgress) {
      try {
        this.setState({
          inProgress: true
        })
        setTimeout(() => {
          if (this.state.inProgress) {
            this.setState({
              inProgress: false,
              error: 'Can not get the permission to connect to your account'
            })
          }
        }, 10000)
        await (this.props.provider as any).enable();
        const provider = new providers.Web3Provider(this.props.provider as AsyncSendable);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        this.props.setAddress(address);
      } catch (e) {
        this.setState({
          inProgress: false,
          error: 'Connection disabled. Please, try again',
        });
      }
    }
  }

  renderError() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else {
      return undefined;
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else if (this.state.inProgress) {
      return <>Waiting for the permission...</>
    } else {
      return (
        <>
          <p>You are not logged in</p>
          {this.renderError()}
          <button onClick={this.handleClick.bind(this)}>Connect</button>
        </>
      );
    }
  }
}

function stateToProps(state: State, props: PassedProps): StateProps {
  return {
    isLoggedIn: !!state.account.address,
  };
}

function dispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setAddress: address => {
      dispatch(account.setAddress(address));
    },
  };
}

export default connect(
  stateToProps,
  dispatchToProps,
)(LoginContainer);
