import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore,persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import storage from 'redux-persist/es/storage';
import reducer from '../reducers';

const config = {
    key: 'stagg',
    storage
};

const combiReducer = persistCombineReducers(config,{reducer});

export const store = createStore(combiReducer);
export const persistor = persistStore(store);

