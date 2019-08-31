import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import BlockchainConnection from './blockchain-connection/blockchain.connection';

export class MainContainer extends React.PureComponent {
  render () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <BlockchainConnection>
            {this.props.children}
          </BlockchainConnection>
        </Provider>
      </BrowserRouter>
    );
  }
}
