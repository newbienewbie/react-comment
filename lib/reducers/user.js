import {TYPES} from '../actions';
import {deepcopy} from '../utils';
import {AVATAR_URL} from '../misc/user-contants';


export function userReducer(state={},action){
    switch(action.type){
        case TYPES.receiveAuthorList:
            return processReceiveAuthorList(state,action);
        case TYPES.fetchCurrentUserProfileSucceeded:
            return processFetchCurrentUserProfileSucceeded(state,action);
        default:
            return state;
    }
}


/**
 * 处理接收到作者列表时的动作
 * @param {*} state 
 * @param {*} action 
 */
function processReceiveAuthorList(state,action){
    const nextState=deepcopy(state);
    if( ! nextState.hasOwnProperty("list") ){
        nextState.list={};
    }
    if( ! nextState.hasOwnProperty("currentLoginUser") ){
        nextState.currentLoginUser=null;
    }

    const {authorList}=action;
    authorList.forEach((author,i)=>{
        if( ! nextState.list[author.id] ){
            if(!author.avatarUrl || author.avatarUrl=="#"){
                author.avatarUrl=AVATAR_URL;
            }
            nextState.list[author.id]=author;
        }
    });
    return nextState;
}



/**
 * 处理动作<获取当前用户信息成功>
 * @param {*} state 
 * @param {*} action 
 */
function processFetchCurrentUserProfileSucceeded(state,action){
    const nextState=deepcopy(state);
    if( ! nextState.hasOwnProperty("currentLoginUser") ){
        nextState.currentLoginUser=null;
    }
    const {info}=action;
    nextState.currentLoginUser=info;
    return nextState;
}