import React from 'react';
import {Pagination} from 'simple-react-ui/dist/pagination';
import {CommentForm} from '../comment/comment-form';
import {ReplyItem} from './reply-item';


/**
 * 用于回复评论的组件
 * 这里并不打算直接复用<Comment/>组件，因为不希望组件加载完毕后自动向服务器请求回复列表，而是希望父负组件传递一个初始的回复列表。
 */
export class Reply extends React.Component{

    constructor(props){
        super(props);
        // 对 回复表单中输入框 的引用
        this.replyRef=null;
    }

    render(){
        return <div>
            {/* reply list */}
            <div>
                {this.props.rows.map((c,i)=>{
                    const {scope,topicId,replyTo,replyUnder}=this.props;
                    return <ReplyItem key={i} 
                        scope={scope} topicId={topicId} replyTo={replyTo} replyUnder={replyUnder}
                        id={c.id} author={c.author} content={c.content}
                        createdAt={c.createdAt} updatedAt={c.updatedAt}
                        upvotes={c.upvotes} downvotes={c.downvotes}
                        onReply={_=>{ }}
                        onUpvote={(id)=>{ this.props.onUpvote(c.id); }} 
                        onDownvote={(id)=>{this.props.onDownvote(c.id); }} 
                    />;
                })}
            </div>
            
            {/* reply form */}
            <CommentForm 
                replyRef={reply=>{
                    {/*this.props.replyRef(reply);*/}
                    this.replyRef=reply;
                }}
                replyTo={this.props.replyTo}
                author={this.props.author} 
                onSubmit={arg=>{
                    const {replyTo,content}=arg;
                    const {scope,topicId}=this.props;
                    this.props.onReply(scope,topicId,replyTo,content);
                }} 
            />


            <Pagination current={this.props.page} size={this.props.size} total={this.props.count} 
                onChange={(page)=>{
                    const {scope,topicId,replyTo,size}=this.props;
                    this.props.onPageChange(scope,topicId,replyTo,page,size)
                }}
            />
        </div>;
    }


}


Reply.defaultProps={
    scope:'post',
    topicId:null,
    replyTo:null,
    replyUnder:null,
    author:{name:'',email:'',avatarUrl:'#',introduction:'',},
    rows:[],
    count:0,
    page:1,
    size:6,
    onReply:()=>{},
    onUpvote:id=>{},
    onDownvote:id=>{},
};