import * as actionTypes from './actions';

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    outreach: false,
    entries: [],
    surveys: [],
    sentiments: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_FIRSTNAME:
            return {
                ...state,
                firstname: action.val
            }

        case actionTypes.SET_LASTNAME:
            return {
                ...state,
                lastname: action.val
            }

        case actionTypes.SET_EMAIL:
            return {
                ...state,
                email: action.val
            }

        case actionTypes.SET_OUTREACH:
            return {
                ...state,
                outreach: action.val
            }

        case actionTypes.SET_ENTRIES:
            return {
                ...state,
                entries: action.val
            }
        
        case actionTypes.ADD_ENTRY:
            return {
                ...state,
                entries: [action.val, ...state.entries]
            }

        case actionTypes.SET_SURVEYS:
            return {
                ...state,
                surveys: action.val
            }

        case actionTypes.ADD_SURVEY:
            return {
                ...state,
                surveys: [action.val, ...state.surveys]
            }   

        case actionTypes.SET_SENTIMENTS:
            return {
                ...state,
                sentiments: action.val
            }

        case actionTypes.ADD_SENTIMENT:
            return {
                ...state,
                sentiments: [action.val, ...state.sentiments]
            }
    }
    return state
}

export default reducer