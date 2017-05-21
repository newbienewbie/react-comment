import {TYPES} from '../actions';


function __(action){
    switch(action){
        case TYPES.upvoteSucceeded:
            var comment=action.comment;
            var comments=state.comments.slice();
            comments.forEach(c=>{
                if(c.id==comment.id){
                    c.upvotes=comment.upvotes;
                }
            })
            return Object.assign({},state,{ comments }) ;
        case TYPES.upvoteFailed:
            alert(`同一个答案只能赞一次`);
            return state;
    
        case TYPES.downvoteSucceeded:
            const comment=action.comment;
            const comments=state.comments.slice();
            comments.forEach(c=>{
                if(c.id==comment.id){
                    c.downvotes=comment.downvotes;
                }
            });
            return Object.assign({},state,{ comments }) ;
        case TYPES.upvoteFailed:
            alert(`同一个答案只能踩一次`);
            return state;
    }
}


export function commentReducer(state={},action){
    switch(action.type){
        // case TYPES.initialLoadedFetchSucceeded:
        //     const {comments, commentsCount, replies }=action;
        //     return Object.assign({},state,{comments,commentsCount,replies});
        case TYPES.fetchCommentListRecevied:
            const c={comments:action.comments,commentsCount:action.count};
            return Object.assign({},state,c);
        case TYPES.fetchReplyListReceived:
            return Object.assign({},state,{replies:action.replies});
        case TYPES.created:
        case TYPES.commentListPageChanged:
            const page=action.page;
            return Object.assign({},state,{currentCommentPage:page});
        case TYPES.upvoteSucceeded:
            let comments=(function(state,action){
                let cs=state.comments.slice();
                let c=action.comment;
                for(let i=0;i<cs.length;i++){
                    if(cs[i].id==c.id){
                        cs[i]=c;
                        break;
                    }
                }
                return cs;
            })(state,action)
            return Object.assign({},state,{comments});
        case TYPES.downvoteSucceeded:
            return Object.assign({},state,{
                comments:(function(state,action){
                    let cs=state.comments.slice();
                    let c=action.comment;
                    for(let i=0;i<cs.length;i++){
                        if(cs[i].id==c.id){
                            cs[i]=c;
                            break;
                        }
                    }
                    return cs;
                })(state,action)
            });
        default:
            return state;
    }
}