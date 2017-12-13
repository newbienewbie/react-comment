import React from 'react';
import {Icon} from 'simple-react-ui';
import moment from 'moment';
import {Reply} from '../../container/reply';
import {shouldDisable,hightlightColor} from '../../misc/utils';
moment.locale('zh-cn');

/**
 * 评论组件，无状态组件，分成三部分
 * * 头部，元信息(作者、统计信息)
 * * 主体：评论
 * * 尾部：操作区
 */
export class CommentItem extends React.Component{

    constructor(props){
        super(props);
    }
 
    render() {
        return (<div className='comment-item'>
            {/* 作者头像 */}
            <div className="comment-author">
                <img src={this.props.author.avatarUrl} alt="avatar" />
            </div>
            {/* body */}
            <div className="comment-body">
                <span><a href={'#'}>{this.props.author.name}</a></span>
                <p>{this.props.content}</p>
                <p>修改于{moment(this.props.updatedAt).fromNow()}</p>
            </div>
            {/* 统计与互动 */}
            <div>
                <div>{this.props.upvotes}人赞同 
                    <button disabled={shouldDisable(this.props.currentUserOpinion)} onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        this.props.onUpvote();
                        return false;
                    }}>
                        赞<Icon.Like fill={hightlightColor(this.props.currentUserOpinion,'like')} />
                    </button>
                </div>
                <div>{this.props.downvotes}人反对 
                    <button disabled={shouldDisable(this.props.currentUserOpinion)}  onClick={e=>{
                        e.preventDefault();
                        e.stopPropagation();
                        this.props.onDownvote();
                        return false;
                    }}>
                        踩<Icon.Dislike fill={hightlightColor(this.props.currentUserOpinion,'hate')}  />
                    </button>
                </div>
                <div>{ this.props.replies.count || 0}条回复 
                    <button onClick={e=>{
                        e.preventDefault();
                        e.stopPropagation();
                        this.reply.focusOnReplyForm();
                        this.reply.setContentOfReplyForm('');
                        return false;
                    }}>
                        回复<Icon.Reply/>
                    </button>
                </div>
            </div> 
            <div className="comment-reply">
                <Reply scope={this.props.scope} topicId={this.props.topicId} 
                    replyUnder={this.props.id} 
                    author={this.props.author}  
                    ref={reply=>{
                        this.reply=reply?reply.getWrappedInstance():null;
                    }}
                />
            </div>
        </div>);
    }
}


CommentItem.defaultProps={
    
    scope:"post",
    topicId:null,

    id:'',
    author:{
        name:'',
        email:'',
        avatarUrl:'',
        introduction:'',
    },
    content:'',
    upvotes:0,
    downvotes:0,
    createdAt:new Date(),
    updatedAt:new Date(),
    currentUserOpinion:null,

    onUpvote:(commentId)=>{},
    onDownvote:(commentId)=>{},
    replies:{rows:[],count:0},
    replyPageSize:6,
    onReply:()=>{},
};
   


export default CommentItem;
