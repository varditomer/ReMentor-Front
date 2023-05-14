// React / Redux
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
// Reducers
import { codeBlockReducer } from './reducers/codeBlock.reducer'


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

// get several reducers and combine it to get one store with several modules
// at the end didn't use the user module according to the assignment details but left it for future use
const rootReducer = combineReducers({
    codeBlockModule: codeBlockReducer,
}) 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))