import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import asyncFactory from 'typescript-fsa-redux-thunk';
import * as services from '../backbone/services';

export interface AccountState {
  address: string | undefined;
}

const action = actionCreatorFactory('ACCOUNT');
const asyncAction = asyncFactory<AccountState>(action);

function initialState(): AccountState {
  const w = window as any;
  if (w.ethereum) {
    // EIP-1102 https://medium.com/metamask/eip-1102-preparing-your-dapp-5027b2c9ed76
    return {
      address: w.ethereum.selectedAddress,
    };
  } else if (w.web3 && w.web3.currentProvider) {
    console.warn('Do not support old, non-EIP-1102-compatible providers');
    return {
      address: undefined,
    };
  } else {
    return {
      address: undefined,
    };
  }
}

const INITIAL_STATE = initialState();

/**
 * @deprecated
 */
export const getAddress = asyncAction<void, string>('GET_ADDRESS', async () => {
  return services.accountService.getAddress();
});

export const setAddress = action<string>('SET_ADDRESS');

export const reducers = reducerWithInitialState(INITIAL_STATE)
  .case(getAddress.async.done, (state, payload) => {
    const address = payload.result;
    return {
      ...state,
      address,
    };
  })
  .case(setAddress, (state, address) => {
    return {
      ...state,
      address,
    };
  });
