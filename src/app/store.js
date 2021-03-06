import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import locale from '../i18n/TranslationReducer';
import navReducer from './NavigationReducer';
import { players } from '../AddPlayers/AddPlayersReducer';
import { scoreBoard } from '../ScoreBoard/ScoreBoardReducer';

const sushiGoApp = combineReducers({
    locale: locale,
    nav: navReducer,
    players,
    scoreBoard
});

const logger = createLogger({
    diff: true,
    predicate: () => __DEV__
});

const store = createStore(sushiGoApp, applyMiddleware(logger, thunk));

export default store;
