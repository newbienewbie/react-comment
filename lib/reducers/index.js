import {combineReducers} from 'redux';
import * as commentActions from '../actions';
import {commentReducer} from './comment';
import {replyReducer} from './reply';
import {userReducer} from './user';


export const reducer=combineReducers({
    comment:commentReducer,
    reply:replyReducer,
    user:userReducer,
});

export default reducer;
export {replyReducer};
export {commentReducer};
export {userReducer};