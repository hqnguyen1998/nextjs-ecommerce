import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { onAuthStateChanged } from '../redux/actions/userActions';

const token = Cookies.get('token');

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;

      dispatch(onAuthStateChanged());
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  return <div>{children}</div>;
};

export default AuthWrapper;
