import I18n from '../utils/i18n';

export function initI18n(locale) {
    //I18n.defaultLocale = 'sv-SE';
    I18n.locale = 'en';
    I18n.fallbacks = true; // fallbacks e.g. "sv-SE"" to "sv""
    I18n.translations = {
        en: {
            copyrightGamewright: "Sushi Go!™ is property of Gamewright®",
            startGame: "Start Game",
            players: "Players",
            playerName: "Player Name",
            noPlayers_Add: "No players added. Add below.",
            addPlayer: "Add Player",
            playerAlreadyExistsTitle: "Player already exists",
            playerAlreadyExistsMessage: "Please choose another name.",
            round_colon: "Round:",
            finishRound: "Finish Round",
            finishGame: "Finish Game",
            pressNameToEnterScore: "Tap a name to enter score.",
            scoreForRound: "Add score",
            newGame: "New Game"
        },
        sv: {
            copyrightGamewright: "Sushi Go!™ ägs av Gamewright®",
            startGame: "Starta spelet",
            players: "Spelare",
            playerName: "Namn",
            noPlayers_Add: "Inga spelar angivna. Lägg till nedan.",
            addPlayer: "Lägg till spelare",
            playerAlreadyExistsTitle: "Namnet finns redan",
            playerAlreadyExistsMessage: "Var god välj ett annat namn.",
            round_colon: "Runda:",
            finishRound: "Avsluta runda",
            finishGame: "Avsluta spelet",
            pressNameToEnterScore: "Tryck på ett namn för att ange poäng.",
            scoreForRound: "Lägg till poäng",
            newGame: "Nytt spel"
        }
    };
}

export default I18n;
