import React from 'react';
import {CommentItem} from './comment-item.js'; 


/**
 * 评论列表组件，无状态组件，根据传递的属性呈现
 */
export const CommentList=React.createClass({
    getDefaultProps:function(){
        return {
            comments:[
                {id:'',author:{name:'',email:'',avatarUrl:'',introduction:'',},content:'',upvotes:0,downvotes:0,createdAt:'',updatedAt:''},
            ],
            onUpvote:(i)=>{},
            onDownvote:(i)=>{},
        };
    },
    render:function () {
        return (<div>
            {this.props.comments.map((c,i)=>{
                return <CommentItem key={i} 
                    id={c.id} author={c.author} content={c.content}
                    createdAt={c.createdAt} updatedAt={c.updatedAt}
                    onUpvote={()=>{ this.props.onUpvote(c.id); }} 
                    onDownvote={()=>{ this.props.onDownvote(c.id); }} 
                    upvotes={c.upvotes} downvotes={c.downvotes}
                />;
            })}
        </div>);
    }
});


export default CommentList;