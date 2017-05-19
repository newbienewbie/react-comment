import React from 'react';
import {Pagination} from 'simple-react-ui/dist/pagination';
import {CommentForm} from '../comment-form';
import {ReplyItem} from './reply-item';
import {configFn} from '../default-fn';


/**
 * 用于回复评论的组件
 * 这里并不打算直接复用<Comment/>组件，因为不希望组件加载完毕后自动向服务器请求回复列表，而是希望父负组件传递一个初始的回复列表。
 */
export class Reply extends React.Component{

    constructor(props){
        super(props);
        this.state={
            comments:this.props.initialReplies.rows || [],
            count:this.props.initialReplies.count,
            page:1,
            size:this.props.defaultPageSize,
        };
    }

    _handleUpvote(id){
        return this.props.onUpvote(id)
            .then(info=>{
                if(!info){alert('每个人只能表达一次赞或踩');}
                const comment=info;
                const comments=this.state.comments.slice();
                comments.forEach(c=>{
                    if(c.id==comment.id){
                        c.upvotes=comment.upvotes;
                    }
                })
                this.setState({comments:comments});
            });
    }

    _handleDownVote(id){
        return this.props.onDownvote(id)
            .then(info=>{
                if(!info){alert('每个人只能表达一次赞或踩');}
                const comment=info;
                const comments=this.state.comments.slice();
                comments.forEach(c=>{
                    if(c.id==comment.id){
                        c.downvotes=comment.downvotes;
                    }
                })
                this.setState({comments:comments});
            });
    }

    /**
     * 当收到属性时，检查其initialReplies 是否和当前一样，否则重置state.comments
     */
    componentWillReceiveProps(nextProps){
        let match=true;
        const rows=nextProps.initialReplies.rows;
        let cs=this.props.initialReplies.rows;
        for(let i=0;i<rows.length;i++){
            let n=rows[i];
            if(cs.indexOf(n)==-1){
                match=false;
                break;
            }
        }
        if(match){
            return;
        }else{
            this.setState({
                comments:nextProps.initialReplies.rows,
                count:nextProps.initialReplies.count,
            });
        }
    }

    render(){
        return <div>
            {/* reply list */}
            <div>
                {this.state.comments.map((c,i)=>{
                    return <ReplyItem key={i} 
                        scope={this.props.scope} topicId={this.props.topicId} replyTo={this.props.replyTo}
                        replyUnder={this.props.replyUnder}
                        id={c.id} author={c.author} content={c.content}
                        createdAt={c.createdAt} updatedAt={c.updatedAt}
                        upvotes={c.upvotes} downvotes={c.downvotes}
                        onUpvote={()=>{ this._handleUpvote(c.id); }} 
                        onDownvote={(id)=>{this._handleDownVote(c.id); }} 
                    />;
                })}
            </div>
            
            {/* reply form */}
            <CommentForm replyRef={this.props.replyRef}
                author={this.props.author} onSubmit={content=>{
                const {scope,topicId,replyTo}=this.props;
                this.props.reply(scope,topicId,replyTo,content)
                    .then(info=>{
                        const {page,size}=this.state;
                        return this.props.fetchReplyList(scope,topicId,replyTo,page,size);
                    }).then((result)=>{
                        const {comments,count}=result;
                        this.setState({comments,count});
                    });
            }}  />


            <Pagination current={this.state.page} size={this.state.size} total={this.state.count} 
                onChange={(page)=>{
                    const {scope,topicId,replyTo}=this.props;
                    this.props.fetchReplyList(scope,topicId,replyTo,page,this.state.size)
                        .then(result=>{
                            const {comments,count}=result;
                            this.setState({ comments,count,page });
                        });
                }}
            />
        </div>;
    }


}


const {create,fetchCommentList,onUpvote,onDownvote} =configFn();

Reply.defaultProps={
    scope:'post',
    topicId:null,
    replyTo:null,
    replyUnder:null,
    author:{name:'',email:'',avatarUrl:'#',introduction:'',},
    initialReplies:{rows:[],count:0},
    defaultPageSize:6,
    reply:create,
    fetchReplyList:fetchCommentList,
    onUpvote:onUpvote,
    onDownvote:onDownvote,
};