import React from 'react';
import {CommentItem} from './comment-item.js'; 


/**
 * 评论列表组件，无状态组件，根据传递的属性呈现
 */
export class CommentList extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
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
};

CommentList.defaultProps={
    comments:[
        {id:'',author:{name:'',email:'',avatarUrl:'',introduction:'',},content:'',upvotes:0,downvotes:0,createdAt:'',updatedAt:''},
    ],
    onUpvote:(i)=>{},
    onDownvote:(i)=>{},
};


export default CommentList;