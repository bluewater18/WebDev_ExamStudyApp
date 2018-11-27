//Main Index
//React Imports
import React from 'react';
import ReactDOM from 'react-dom';

//Redux Imports
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

//File Imports
import './styles/main.scss';
import App from './scripts/containers/App.jsx';
import Loader from './scripts/components/Loader';
import { store, persistor } from './scripts/store/index';

//Misc Imports
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Provider store={store}><PersistGate loading={<Loader />} persistor={persistor}> < App /></PersistGate></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
