import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { players } from './AddPlayers/AddPlayersReducer';

const sushiGoApp = combineReducers({
    players
});

const logger = createLogger({
    diff: true,
    predicate: () => __DEV__
});

const store = createStore(sushiGoApp, applyMiddleware(logger, thunk));

export default store;
