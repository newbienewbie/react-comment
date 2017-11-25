import React from 'react';
import {connect} from 'react-redux';
import {LoginMaskLayer as LoginMaskLayerComponent} from '../components/login-mask-layer';
import {deepcopy} from '../utils';


function mapStateToProps(state){
    return {
        hasSignedIn:state.user.hasSignedIn,
    };
}

function mapDispathToProps(dispatch){
    return {
        dispatch,
    };
}

export const LoginMaskLayer=connect(mapStateToProps,mapDispathToProps)(LoginMaskLayerComponent);
export default LoginMaskLayer;