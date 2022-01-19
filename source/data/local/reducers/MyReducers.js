import { combineReducers, createStore } from "redux"
import ReducersConstants from "./ReducersConstants"

// import Defaultlanguage from '../../../assets/languages/english.json';
import Defaulttheme from '../../../assets/theme/light.json';

const initialThemeState = {
    theme: Defaulttheme
}
const themeReducer = (state = initialThemeState, action) => {
    switch (action.type) {
        case ReducersConstants.ACTIVE_THEME:
            return { theme: action.theme }
    }
    return state
}

const cartReducer = (state = initialThemeState, action) => {
    switch (action.type) {
        case ReducersConstants.UPDATE_CART_COUNTER:
            return { counter: action.counter }
        case ReducersConstants.RESET_CART_COUNTER:
            return { counter: 0 }
    }
    return state
}


// const initialLangState = {
//     language: Defaultlanguage
// }
// const languageReducer = (state = initialLangState, action) => {
//     switch (action.type) {
//         case ReducersConstants.ACTIVE_LANGUAGE:
//             return { language: action.language }
//     }
//     return state
// }

// const initialNotificationState = {
//     count: 0
// }
// const notificationsReducer = (state = initialNotificationState, action) => {
//     switch (action.type) {
//         case ReducersConstants.UPDATE_NOTIFICATIONS_COUNTER:
//             return { count: action.count }
//         case ReducersConstants.RESET_NOTIFICATIONS_COUNTER:
//             return { count: 0 }
//     }
//     return state
// }

// const reducers = combineReducers({ themeReducer, languageReducer, notificationsReducer })
const reducers = combineReducers({ themeReducer, cartReducer })
const store = createStore(reducers)
export default store