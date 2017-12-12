const domain=require('../../domain');


function create(scope,topicId,userId,opinion){
    return domain.topicUserOpinion.create({
        scope,topicId,userId, opinion
    });
}


function cancel(scope,topicId,userId,opinion){
    return domain.topicUserOpinion.destroy(
        {
            where:{
                scope,topicId,userId,opinion
            }
        }
    );
}



function getOpinionOfUser(scope,topicId,userId){
    return domain.topicUserOpinion.find({
        where:{ scope,topicId,userId, }
    });
}


function getOpinionListOfUserAndTopcIds(scope,topicIds=[],userId){

    return domain.topicUserOpinion.findAll({
        where:{ 
            scope,
            userId,
            topicId:{ $in:topicIds },
        }
    });
}

/**
 * 用户是否已经对某个主题有过意见
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} userId 
 * @return {Promsie<true>}
 */
function hasAnyOpinion(scope,topicId,userId){
    return getOpinionOfUser(scope,topicId,userId)
        .then(opinion=>{
            return !!opinion;
        });
}


/**
 * 用户是否已对某个主题发表过意见为`opinions`之一的评论
 * @param {*} scope 
 * @param {*} topicId 
 * @param {*} userId 
 * @param {*} opinions 
 */
function hasAnyOpinionOf(scope,topicId,userId,opinions=[]){
    return domain.topicUserOpinion.find({
        where:{ 
            scope,
            topicId,
            userId, 
            opinion:{$in:opinions}
        }
    }).then(opinion=>{
        return !!opinion;
    });
}

function like(scope,topicId,userId){
    return create(scope,topicId,userId,"like");
}


function cancelLike(scope,topicId,userId){
    return cancel(scope,topicId,userId,"like");
}


function hate(scope,topicId,userId){
    return create(scope,topicId,userId,"hate");
}

function cancelHate(scope,topicId,userId){
    return cancel(scope,topicId,userId,"hate");
}


module.exports={
    getOpinionOfUser,
    getOpinionListOfUserAndTopcIds,
    hasAnyOpinion, hasAnyOpinionOf,
    like,cancelLike,
    hate,cancelHate,
};