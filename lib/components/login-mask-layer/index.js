import React from 'react';


/**
 * 登陆遮罩层
 */
export class LoginMaskLayer extends React.Component{

    constructor(props){
        super(props);
    }


    mask(){
        return this.props.hasSignedIn? 'none':'block';
    }

    loginUrl(){
        const location=document.location;
        return `${this.props.loginUrl}?redirectUrl=${location}`;
    }

    render(){
        return (
        <div className='react-comment-mask' 
            style={{ 
                display: this.mask() ,
                position:'absolute' , 
                height: '100%',
                width:'100%',
                background:'rgba(12, 12, 12, 0.3)'
            }}
        >
            <a href={this.loginUrl()} style={{ display:'block',color:'red', fontSize:'2em',textAlign:'center' }} >
                请登陆
            </a>
        </div>);
    }
}


LoginMaskLayer.defaultProps={
    hasSignedIn:false,
    loginUrl:'#',
};