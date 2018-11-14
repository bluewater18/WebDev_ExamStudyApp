//store/index
import { applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import middleware, { sagaMiddleware } from './middlewares';

import rootReducer from '../reducers';
import rootSaga from '../sagas'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}
const pReducer = persistReducer(persistConfig, rootReducer)




const configStore = (initialState = {}) => {
    const store = createStore(
        pReducer,
        initialState,
        applyMiddleware(...middleware),
    );
    sagaMiddleware.run(rootSaga);

    return {
        persistor: persistStore(store),
        store,
    };
};

const { store, persistor } = configStore();

export { store, persistor };
