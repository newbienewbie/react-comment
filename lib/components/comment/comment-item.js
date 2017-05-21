import React from 'react';
import {Icon} from 'simple-react-ui';
import moment from 'moment';
import {Reply} from '../reply';
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
        this.replyRef=null;
    }
 
    render() {
        return (<div className='comment-item'>
            {/* 作者头像 */}
            <div className="comment-author">
                <img src={this.props.author.avatarUrl}/>
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
                        this.setState({replyTo:this.props.replyTo},()=>{
                            // 找到当前顶级评论的次级回复组件的评论框，然后切换焦点
                            this.replyRef.focus();
                        });
                        return false;
                    }}>
                        回复<Icon.Reply/>
                    </button>
                </div>
            </div> 
            <div className="comment-reply">
            </div>
        </div>);
    }
}


CommentItem.defaultProps={
    
    scope:"post",
    topicId:null,

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
    replyPageSize:6,
};
   


export default CommentItem;
