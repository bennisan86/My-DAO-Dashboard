import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { MetamaskContainer } from './metamask/metamask.container';

export class MainContainer extends React.PureComponent {
  render () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <MetamaskContainer>
            {this.props.children}
          </MetamaskContainer>
        </Provider>
      </BrowserRouter>
    );
  }
}
