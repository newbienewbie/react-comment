import React from 'react';
import {connect} from 'react-redux';
import {Reply as ReplyComponent} from '../components/reply';
import {deepcopy} from '../utils';


const defaultReply={
    rows:[],
    count:0,
    page:1,
    wantToReplyTo:null,
};

function getRepliesOfComment(replies,commentId){
    let result=Object.assign({},defaultReply);
    if(!replies || ! replies[commentId]){
        return result;
    }
    return replies[commentId];
}


function mapStateToProps(state){
    return {
        replies:state.reply.replies?state.reply.replies:Object.assign({},defaultReply),
        size:state.reply.replyPageSize,
        user:state.user,
    };
}

function mapDispathToProps(dispatch){
    return {
        dispatch,
    };
}


/**
 * 把相关属性注入到`Reply`组件中
 * @param {*} propsFromState 
 * @param {*} propsFromDispatch 
 * @param {*} ownProps 
 */
function mergeProps(propsFromState,propsFromDispatch,ownProps){
    propsFromState=deepcopy(propsFromState);
    const user=propsFromState.user;
    const commentId=ownProps.replyUnder;
    // set {rows,count,wantToReplyTo}
    const props=getRepliesOfComment(propsFromState.replies,commentId);
    // embed author_info into replies
    const rows=props.rows?props.rows:[];
    rows.forEach(function(r,i) {
        var author = null;
        for(var i =0; i<user.list.length; i++){
            if(user.list[i].id == r.authorId){
                author = user.list[i];
                break;
            }
        }
        r.author=author;
    });;
    const to=props.wantToReplyTo;
    // 如果未指定回复目标，就初始化为当前`<Reply/>`组件所属评论的id
    props.wantToReplyTo=to?to:commentId;
    props.size=propsFromState.size;
    props.page=propsFromState.replies.page;
    props.dispatch=propsFromDispatch.dispatch
    /*
        {
            ... propsFromState,
            ... propsFromDispatch
            ... ownProps
        }
    */
    return Object.assign({},props,ownProps);
}



export const Reply=connect(mapStateToProps,mapDispathToProps,mergeProps,{withRef:true})(ReplyComponent);
export default Reply;