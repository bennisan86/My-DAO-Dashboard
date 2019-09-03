import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { MetamaskContainer } from './metamask/metamask.container';
import { BoxContainer } from './box/box.container';

export class MainContainer extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <MetamaskContainer>
            <BoxContainer>{this.props.children}</BoxContainer>
          </MetamaskContainer>
        </Provider>
      </BrowserRouter>
    );
  }
}
