const ADD_PLAYER = 'ADD_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const UPDATE_NEW_PLAYER = 'UPDATE_NEW_PLAYER';

const initialState = {
    playerList: [],
    newPlayer: ''
};

export const players = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_PLAYER:
            return { newPlayer: action.name, playerList: state.playerList };
        case ADD_PLAYER:
            return { newPlayer: '', playerList: [...state.playerList, action.newPlayer] };
        case REMOVE_PLAYER:
            return { newPlayer: state.newPlayer, playerList: state.playerList.filter(p => p !== action.name) };
        default:
            return state;
    }
};

export const addPlayer = (newPlayer, playerList) => {
    if (!newPlayer) {
        return {
            type: 'NOP'
        };
    }

    if (playerList.indexOf(newPlayer) >= 0) {
        return {
            type: 'NOP'
        };
    }

    return {
        type: ADD_PLAYER,
        newPlayer
    };
};

export const removePlayer = (name) => {
    return {
        type: REMOVE_PLAYER,
        name
    };
};

export const updateNewPlayer = (name) => {
    return {
        type: UPDATE_NEW_PLAYER,
        name
    }
};
