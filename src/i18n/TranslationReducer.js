import i18n from './translations';
const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE';

export const changeLanguage = (locale) => ({
    type: LANGUAGE_CHANGE,
    locale
});

const initialState = 'en';

export default (state = initialState, action) => {
    switch (action.type) {
        case LANGUAGE_CHANGE:
            i18n.locale = action.locale;
            return action.locale;
        default:
            return state;
    }
};