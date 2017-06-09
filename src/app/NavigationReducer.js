import { StateUtils } from 'react-navigation';
import uuid from '../utils/uuid';  

const PUSH = 'PUSH_START';
const POP = 'POP_START';

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

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUSH:
            return StateUtils.push(state, action.route);
        case POP:
            return StateUtils.pop(state);
        default:
            return state;
    }
};

export default navReducer;
