import {TYPES} from '../actions';
import {deepcopy} from '../utils';


export function userReducer(state={},action){
    switch(action.type){
        case TYPES.receiveAuthorList:
            return processReceiveAuthorList(state,action);
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
            nextState.list[author.id]=author;
        }
    });
    return nextState;
}