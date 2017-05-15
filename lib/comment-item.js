import React from 'react';
import {Icon} from 'simple-react-ui';


/**
 * 评论组件，无状态组件，分成三部分
 * * 头部，元信息(作者、统计信息)
 * * 主体：评论
 * * 尾部：操作区
 */
export const CommentItem=React.createClass({

    getDefaultProps:function(){
        return {
            id:'',
            author:{name:'',email:'',avatarUrl:'',introduction:'',},
            content:'',
            upvotes:0,
            downvotes:0,
            createdAt:new Date(),
            updatedAt:new Date(),
            onUpvote:()=>{},
            onDownvote:()=>{},
        };
    },
    
    render() {
        return (<div className='comment-item'>
            {/* header */}
            <div>
                <div>
                    <div>
                        <img src={this.props.author.avatarUrl}/>
                    </div>
                    <div>
                        <span><a href={'#'}>{this.props.author.name}</a></span>
                        <div>{this.props.author.introduction}</div>
                    </div>
                </div>
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
                </div>
            </div>
            {/* body */}
            <div>
                <p>{this.props.content}</p>
                <p>修改于 {this.props.updatedAt.toString()}</p>
            </div>
        </div>);
    }
});


export default CommentItem;
