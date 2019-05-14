import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import firebase from './Config/dbConfig';

const initialState = {};

const middleware = thunk.withExtraArgument({ getFirebase });

const store = createStore(
    rootReducer, 
    initialState,
    compose(
        applyMiddleware(middleware),
        reactReduxFirebase(firebase, {attachAuthIsReady: true}),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) 
    
);

export default store;