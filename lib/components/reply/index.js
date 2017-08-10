import React from 'react';
import {Pagination} from 'simple-react-ui/dist/pagination';
import {CommentForm} from '../comment/comment-form';
import {ReplyItem} from './reply-item';
import {createReply,upvote,downvote,upvoteReplySucceeded,upvoteReplyFailed,downvoteReplySucceeded,downvoteReplyFailed,fetchReplyListOfComment,replyListPageChanged} from  '../../actions';

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
            {this.props.rows.map((c,i)=>{
                const {scope,topicId,replyTo,replyUnder}=this.props;
                return <ReplyItem key={i} 
                    scope={scope} topicId={topicId} replyTo={replyTo} replyUnder={replyUnder}
                    id={c.id} author={c.author} content={c.content}
                    createdAt={c.createdAt} updatedAt={c.updatedAt}
                    upvotes={c.upvotes} downvotes={c.downvotes}
                    onReply={(scope,topicId,replyTo,content)=>{
                        return this.props.dispatch(createReply(scope,topicId,replyTo,content))
                            .then(reply=>{
                                const page=this.props.page;
                                const size=this.props.size;
                                const action=fetchReplyListOfComment(scope,topicId,reply.replyUnder,page,size);
                                return this.props.dispatch(action);
                            });
                    }}
                    onUpvote={(id)=>{
                        const action=upvote(c.id);
                        return this.props.dispatch(action)
                            .then(reply=>{
                                if(reply){
                                    const action=upvoteReplySucceeded(reply);
                                    return this.props.dispatch(action);
                                }else{
                                    const action=upvoteReplyFailed(reply);
                                    this.props.dispatch(action);
                                }
                            }); 
                    }} 
                    onDownvote={(id)=>{
                        const action=downvote(c.id);
                        return this.props.dispatch(action)
                            .then(reply=>{
                                if(reply){
                                    const action=downvoteReplySucceeded(reply);
                                    return this.props.dispatch(action);
                                }else{
                                    const action=downvoteReplyFailed(reply);
                                    this.props.dispatch(action);
                                }
                            });
                    }} 
                />;
            })}
        
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
                    return this.props.dispatch(createReply(scope,topicId,replyTo,content))
                        .then(reply=>{
                            const page=this.props.page;
                            const size=this.props.size;
                            const action=fetchReplyListOfComment(scope,topicId,reply.replyUnder,page,size);
                            return this.props.dispatch(action);
                        });
                }} 
            />


            <Pagination current={this.props.page} size={this.props.size} total={this.props.count} 
                onChange={(page)=>{
                    const {scope,topicId,replyUnder,size}=this.props;
                    const action=fetchReplyListOfComment(scope,topicId,replyUnder,page,size);
                    return this.props.dispatch(action)
                        .then(_=>{
                            this.props.dispatch(replyListPageChanged(replyUnder,page));
                        });
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
    onPageChange:(scope,topicId,replyUnder,page,size)=>{},
};