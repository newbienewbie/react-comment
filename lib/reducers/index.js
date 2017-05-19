import * as commentActions from '../actions';


export function reducer(state={},action){
    switch(action.type){
        case commentActions.upvoteSucceeded:
            return ;
        default:
            const s=Object.assign({shit:'shit'},state);
            return s;
    }
}