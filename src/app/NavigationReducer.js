import { StateUtils } from 'react-navigation';
import uuid from '../utils/uuid';  

const PUSH = 'PUSH_START';
const POP = 'POP_START';
const NEW_GAME = 'NEW_GAME';

const initialState = {
    index: 0,
    routes: [{ 
        key: "Start", 
        routeName: "Start"
    }]
}

export const popNavigate = () => {
    return {
        type: POP
    };
};

export const pushNavigate = (routeName, props) => {
    return {
        type: PUSH,
        route: {
            key: `${routeName}-${uuid()}`,
            routeName: routeName,
            ...props
        }
    };
};

export const newGame = () => ({
    type: NEW_GAME,
    route: {
        index: 0,
        routes: [{
            key: 'Start',
            routeName: 'AddPlayers'
        }]
    }
});

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUSH:
            return StateUtils.push(state, action.route);
        case POP:
            return StateUtils.pop(state);
        case NEW_GAME:
            console.log(NEW_GAME, action.route);
            return action.route;
        default:
            return state;
    }
};

export default navReducer;
