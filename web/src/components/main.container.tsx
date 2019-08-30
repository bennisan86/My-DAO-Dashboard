import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import BlockchainConnectionContainer from './blockchain-connection/blockchain-connection.container';

export class MainContainer extends React.PureComponent {
  render () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <BlockchainConnectionContainer>
            {this.props.children}
          </BlockchainConnectionContainer>
        </Provider>
      </BrowserRouter>
    );
  }
}
