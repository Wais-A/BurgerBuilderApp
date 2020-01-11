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
    localStorage.removeItem('token')
    localStorage.removeItem('expDate')
    localStorage.removeItem('userId')
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
            const expDate = new Date( new Date().getTime() + res.data.expiresIn * 1000)

            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem( 'expDate', expDate)
            localStorage.setItem('userId', res.data.localId)
            dispatch(authSuccess(res.data.idToken, res.data.localId))
            dispatch(checkAuthTimeOut(res.data.expiresIn));
            })
            .catch(err => dispatch(authFail(err.response.data.error)))
            }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        }else {
            const expTime = new  Date(localStorage.getItem('expDate'))
            if(expTime > new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch( authSuccess( token, userId))
                dispatch(checkAuthTimeOut(expTime.getSeconds()- new Date().getSeconds()))

            }else {
                 dispatch(logout())
            }
           
        }
    }
}