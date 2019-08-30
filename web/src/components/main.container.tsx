import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import BlockchainConnectionContainer from './login/blockchain-connection.container';
import CanNotBlockchainComponent from './login/can-not-blockchain.component';

export const MainContainer: React.FC = props => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <BlockchainConnectionContainer>
          {props.children}
        </BlockchainConnectionContainer>
      </Provider>
    </BrowserRouter>
  );
};
