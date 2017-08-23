const domain=require('../../domain');


function findById(userId){
    return domain.user.findById(userId);
}


module.exports={
    findById,
};