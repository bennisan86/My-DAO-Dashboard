import React from 'react';
import CanNotBlockchainComponent from './can-not-blockchain.component';
import LoginContainer from './login.container';
import { ServicesContext } from '../../contexts/services.context';

export class BlockchainConnectionContainer extends React.PureComponent {
  render() {
    return (
      <ServicesContext.Consumer>
        {services => {
          const provider = services.metamaskProvider();
          if (provider) {
            return <LoginContainer>{this.props.children}</LoginContainer>;
          } else {
            return <CanNotBlockchainComponent />;
          }
        }}
      </ServicesContext.Consumer>
    );
  }
}

export default BlockchainConnectionContainer;
