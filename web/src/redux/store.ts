import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import * as account from './account.redux'
import * as daos from './daos.redux'
import {AccountState} from "./account.redux";
import {DaosState} from "./daos.redux";

export interface State {
  account: AccountState;
  daos: DaosState;
}

export const store = createStore(combineReducers({
    account: account.reducers,
    daos: daos.reducers,
}), applyMiddleware(thunk,
    // logger
))
