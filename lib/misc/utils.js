

export function shouldDisable(currentUserOpinion){
    console.log(`当前用户意见`,currentUserOpinion);
    return currentUserOpinion=='like' || currentUserOpinion=='hate'?
        true: false;
}

export default shouldDisable;