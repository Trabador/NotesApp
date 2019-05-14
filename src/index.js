import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


store.firebaseAuthIsReady.then(() => {
    console.log('auth ready')
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root'));
    registerServiceWorker();
});

