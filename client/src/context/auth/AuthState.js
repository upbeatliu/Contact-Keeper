import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User
  const loadUser = () => console.log('load User');

  //Register User
  const register = async formData => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.post('/api/uers', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  }

  //Login User
  const loginUser = () => console.log('login User');
  //Log out
  const logoutUser = () => console.log('logout User');
  //Clear errors
  const clearErrors = () => console.log('clear errors');

  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      user: state.user,
      error: state.error,
      loadUser,
      register,
      loginUser,
      logoutUser,
      clearErrors
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState