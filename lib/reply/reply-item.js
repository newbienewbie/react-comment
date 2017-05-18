import React from 'react';
import {Icon} from 'simple-react-ui';

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
                    <div>{!this.props.replies || this.props.replies.length==0 ?0 :this.props.replies.length}条回复 
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
        </div>);
    }
}


ReplyItem.defaultProps={
    id:'',
    author:{name:'',email:'',avatarUrl:'',introduction:'',},
    content:'',
    upvotes:0,
    downvotes:0,
    createdAt:new Date(),
    updatedAt:new Date(),
    onUpvote:(commentId)=>{},
    onDownvote:(commentId)=>{},
    replies:[ ],
    topicId:null,
    replyTo:null,
    scope:"post",
};
   


export default ReplyItem;
