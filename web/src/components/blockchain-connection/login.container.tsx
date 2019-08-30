import React from 'react';
import { State } from '../../redux/store';
import { connect } from 'react-redux';
import * as account from '../../redux/account.redux';
import { Dispatch } from 'redux';
import Loader from '../Layout/Loader/Loader';
import { Services } from '../../services/services';
import { ServicesContext } from '../../contexts/services.context';

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  setAccount: (address: string) => void;
}

type Props = StateProps & DispatchProps;

interface LoginContainerState {
  error: string | undefined,
  inProgress: boolean
}

export class LoginContainer extends React.Component<Props, LoginContainerState> {
  state = {
    error: undefined,
    inProgress: false
  };

  async handleClick(services: Services) {
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
        await services.enable()
        const account = await services.account()
        this.props.setAccount(account);
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
      return <Loader/>
    } else {
      return (
        <ServicesContext.Consumer>
          {services => {
            return <>
              <p>You are not logged in</p>
              {this.renderError()}
              <button onClick={this.handleClick.bind(this, services)}>Connect</button>
            </>
          }}
        </ServicesContext.Consumer>
      );
    }
  }
}

function stateToProps(state: State): StateProps {
  return {
    isLoggedIn: !!state.account.address,
  };
}

function dispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setAccount: address => {
      dispatch(account.setAddress(address));
    },
  };
}

export default connect(
  stateToProps,
  dispatchToProps,
)(LoginContainer);
