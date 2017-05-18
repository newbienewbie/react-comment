import React from 'react';
import {Icon} from 'simple-react-ui';
// import {Comment} from './comment';
import {Reply} from './reply';

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
            {/* header */}
            <div>
                {/* 作者信息 */}
                <div>
                    <div>
                        <img src={this.props.author.avatarUrl}/>
                    </div>
                    <div>
                        <span><a href={'#'}>{this.props.author.name}</a></span>
                        <div>{this.props.author.introduction}</div>
                    </div>
                </div>
                {/* 统计与互动 */}
                <div>
                    <div>{this.props.upvotes}人赞同 
                        <button onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            this.props.onUpvote();
                            return false;
                        }}>
                            赞<Icon.Like/>
                        </button>
                    </div>
                    <div>{this.props.downvotes}人反对 
                        <button onClick={e=>{
                            e.preventDefault();
                            e.stopPropagation();
                            this.props.onDownvote();
                            return false;
                        }}>
                            踩<Icon.Dislike/>
                        </button>
                    </div>
                    <div>{ this.props.replies.count || 0}条回复 
                        <button onClick={e=>{
                            e.preventDefault();
                            e.stopPropagation();
                            this.props.onReply();
                            return false;
                        }}>
                            回复<Icon.Reply/>
                        </button>
                    </div>
                </div>
            </div>
            {/* body */}
            <div>
                <p>{this.props.content}</p>
                <p>修改于 {this.props.updatedAt.toString()}</p>
            </div>
            <div className="comment-reply">
                <Reply topicId={this.props.topicId} scope={this.props.scope}  replyTo={this.props.id} 
                    replyUnder={this.props.id}
                    initialReplies={this.props.replies}
                    onReply={this.props.onReply} 
                    defaultPageSize={this.props.defaultReplyPageSize}
                />
            </div>
        </div>);
    }
}


CommentItem.defaultProps={
    id:'',
    author:{name:'',email:'',avatarUrl:'',introduction:'',},
    content:'',
    upvotes:0,
    downvotes:0,
    createdAt:new Date(),
    updatedAt:new Date(),
    onUpvote:(commentId)=>{},
    onDownvote:(commentId)=>{},
    replies:{rows:[],count:0},
    topicId:null,
    replyTo:null,
    replyUnder:null,
    scope:"post",
    defaultReplyPageSize:6,
};
   


export default CommentItem;
