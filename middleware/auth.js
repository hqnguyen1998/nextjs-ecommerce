import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { onAuthStateChanged } from '../redux/actions/userActions';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

    dispatch(onAuthStateChanged(token));
  }, []);

  return <div>{children}</div>;
};

export default AuthWrapper;