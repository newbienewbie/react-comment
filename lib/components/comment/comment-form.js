import React from 'react';
import {AVATAR_URL} from  '../avatarUrl';


/**
 * 评论表单
 */
export class CommentForm extends React.Component{

    constructor(props){
        super(props);
        this.state={ content:'' };
        // 暴露focus()给外部
        this.focus=this.focus.bind(this);
    }

    /**
     * 用于聚焦
     * 暴露给外部的方法
     */
    focus(){
        this.textarea.focus();
    }

    render(){
        return (<form className={this.props.className}>
            <div>
                <img src={this.props.author.avatarUrl} alt="avatar"/>
                <div>
                    <textarea  ref={textarea=>{ this.textarea=textarea }}
                        placeholder='写下你的评论' value={this.state.content} 
                        onChange={e=>{this.setState({content:e.target.value});}}
                    />
                </div>
            </div>
            <div className={""}>
                <button onClick={_=>{this.setState({content:''});}}>取消</button>
                <button onClick={e=>{ 
                    e.stopPropagation();
                    e.preventDefault();
                    const {replyTo}=this.props;
                    const content=this.state.content.slice(0);
                    // 无需提交 author ，因为author是由SESSION在服务端判定
                    this.props.onSubmit({replyTo,content}); 
                    this.setState({content:''}) ;
                }}>
                    发表
                </button>
            </div>
        </form>);
    }
}


CommentForm.defaultProps={
    className:'comment-form',
    author:{
        name:'',
        email:'',
        avatarUrl:AVATAR_URL,
        introduction:'',
    },
    replyTo:null,
    onSubmit:(obj={replyTo:null,content:''})=>{},
};