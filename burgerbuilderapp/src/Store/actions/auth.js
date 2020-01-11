import * as actionTypes from './actionsTypes';
import axios from 'axios'
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token, 
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
        }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime * 1000);
    }
}


export const auth = (email, password, isSignUp) => {
    return dispatch=> {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTeYwYliR0ihTm0 - wsh6aXG51MCCp6HdQ'
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTeYwYliR0ihTm0 - wsh6aXG51MCCp6HdQ'
        }
        axios.post( url, authData)
        .then(res => {
            dispatch(authSuccess(res.data.idToken, res.data.localId))
            dispatch(checkAuthTimeOut(res.data.expiresIn));
            })
            .catch(err => dispatch(authFail(err.response.data.error)))
            }
}