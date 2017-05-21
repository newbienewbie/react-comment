import React from 'react';


/**
 * 评论表单
 */
export class CommentForm extends React.Component{

    constructor(props){
        super(props);
        this.state={ content:'' };
    }

    render(){
        return (<form className="comment-form">
            <div>
                <img src={this.props.author.avatarUrl}/>
                <textarea  ref={this.props.replyRef}
                    placeholder='写下你的评论' value={this.state.content} 
                    onChange={e=>{this.setState({content:e.target.value});}}
                />
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
    author:{name:'',email:'',avatarUrl:'#',introduction:'',},
    replyTo:null,
    onSubmit:(obj={replyTo:null,content:''})=>{},
};