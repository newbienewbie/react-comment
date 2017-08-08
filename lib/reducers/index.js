import {combineReducers} from 'redux';
import * as commentActions from '../actions';
import {commentReducer} from './comment';
import {replyReducer} from './reply';



export const reducer=combineReducers({
    comment:commentReducer,
    reply:replyReducer,
});

export default reducer;
export {replyReducer};
export {commentReducer};