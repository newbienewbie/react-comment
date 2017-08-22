import {TYPES} from '../actions';


function deepCopy(obj){
    return JSON.parse(JSON.stringify(obj));
}



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
    const nextState=deepCopy(state);
    const {authorList}=action;
    authorList.forEach((author,i)=>{
        if( ! nextState[author.id] ){
            nextState[author.id]=author;
        }
    });
    return nextState;
}