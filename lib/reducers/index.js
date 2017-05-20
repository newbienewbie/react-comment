import {combineReducers} from 'redux';
import * as commentActions from '../actions';
import {commentReducer} from './comment';



export const reducer=combineReducers({
    comment:commentReducer,
});