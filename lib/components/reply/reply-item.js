import React from 'react';
import {Icon} from 'simple-react-ui';
import moment from 'moment';
import {shouldDisable} from '../../misc/utils';
moment.locale('zh-cn');

/**
 * 次级回复组件，无状态，分成三部分
 * * 头部，元信息(作者、统计信息)
 * * 主体：评论
 * * 尾部：操作区
 */
export class ReplyItem extends React.Component{

    constructor(props){
        super(props);
    }
 
    render() {
        return (<div className='reply-item'>
            {/* 作者信息 */}
            <div>
                <img src={this.props.author.avatarUrl} alt="avatar"/>
            </div>
            {/* body */}
            <div>
                <p>
                    <span className="author"><a href={''}>{this.props.author.name||"魏登极"}</a></span>:
                    {this.props.content}
                </p>
            </div>
            {/* 统计与互动 */}
            <div>
                <div>回复于{moment(this.props.createdAt).fromNow()}</div>
                <div>{this.props.upvotes}人赞同 
                    <button disabled={shouldDisable(this.props.currentUserOpinion)} onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        this.props.onUpvote(this.props.id);
                        return false;
                    }}>
                        赞<Icon.Like/>
                    </button>
                </div>
                <div>{this.props.downvotes}人反对 
                    <button disabled={shouldDisable(this.props.currentUserOpinion)} onClick={e=>{
                        e.preventDefault();
                        e.stopPropagation();
                        this.props.onDownvote(this.props.id);
                        return false;
                    }}>
                        踩<Icon.Dislike/>
                    </button>
                </div>
                <div>{!this.props.replies || this.props.replies.length==0 ?0 :this.props.replies.length}条回复 
                    <button onClick={e=>{
                        e.preventDefault();
                        e.stopPropagation();
                        this.props.onWantToReplyTo(this.props.id,this.props.author.id);
                        return false;
                    }}>
                        回复<Icon.Reply/>
                    </button>
                </div>
            </div>
        </div>);
    }
}


ReplyItem.defaultProps={
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
    onUpvote:(commentId)=>{},
    onDownvote:(commentId)=>{},
    onWantToReplyTo:(toReplyId,toUserId)=>{},
    replies:[ ],
    topicId:null,
    replyTo:null,
    scope:"post",
    currentUserOpinion:null,
};
   


export default ReplyItem;
