import { applyMiddleware, createStore, combineReducers } from 'redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers(reducers);
const appliedMiddleware = applyMiddleware(thunkMiddleware);

export default createStore(rootReducer, {}, appliedMiddleware);
