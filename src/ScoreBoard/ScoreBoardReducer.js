const START_NEW_GAME = "START_NEW_GAME";
const ADD_SCORE_FOR_PLAYER = 'ADD_SCORE_FOR_PLAYER';
const FINISH_ROUND = 'FINISH_ROUND';

const initialState = {
    round: 0,
    players: []
};

export const scoreBoard = (state = initialState, action) => {
    switch (action.type) {
        case START_NEW_GAME:
            return { round: 0, players: action.players };
        case ADD_SCORE_FOR_PLAYER:
            const { player, score } = action.payload;
            return {...state, players: state.players.map(p => {
                if (p.name === player) {
                    const newScore = p.score + parseInt(score);
                    return { name: p.name, score: isNaN(newScore) ? p.score : newScore };
                }
                return p;
            })};
        case FINISH_ROUND: {
            return { ...state, round: state.round + 1 };
        }
    }
    return state;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const startNewGame = (players) => ({
    type: START_NEW_GAME,
    players: players.map(player => {
        return { name: player, score: 0 };
    })
});

export const addScoreForPlayer = (player, score) => ({
    type: ADD_SCORE_FOR_PLAYER,
    payload: {
        player,
        score
    }
});

export const finishRound = (currentRound) => ({
    type: currentRound < 2 ? FINISH_ROUND : 'END_GAME'
});
