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
                <textarea placeholder='写下你的评论' value={this.state.content} onChange={e=>{this.setState({content:e.target.value});}}/>
            </div>
            <div>
                <button onClick={_=>{this.setState({content:''});}}>取消</button>
                <button onClick={_=>{ 
                    const content=this.state.content.slice(0);
                    this.props.onSubmit(content); 
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
    onSubmit:(content)=>{},
};


export default CommentForm;