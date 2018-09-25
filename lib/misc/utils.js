

/**
 * 用于判断是否要禁用 赞/踩 按钮
 * @param {String} currentUserOpinion 
 */
export function shouldDisable(currentUserOpinion){
    return currentUserOpinion=='upvote' || currentUserOpinion=='downvote'?
        true: false;
}


/**
 * 用于选择 赞/踩 的高亮颜色
 * @param {String} currentUserOpinion 
 * @param {String} action 
 */
export function hightlightColor(currentUserOpinion=null,action="upvote"||"downvote"){
    return currentUserOpinion==action?"#eee":null
}

export default shouldDisable;