//redux toolkit
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducer/globalReducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));
