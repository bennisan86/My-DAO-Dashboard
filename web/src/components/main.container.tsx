import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { MetamaskLoader } from './metamask/metamask.loader';
import { BoxLoader } from './box/box.loader';

export class MainContainer extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <MetamaskLoader>
            <BoxLoader>{this.props.children}</BoxLoader>
          </MetamaskLoader>
        </Provider>
      </BrowserRouter>
    );
  }
}
