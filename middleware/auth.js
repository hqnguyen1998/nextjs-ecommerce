import React from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { onAuthStateChanged } from '../redux/actions/userActions';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = Cookies.get('token');

    dispatch(onAuthStateChanged(token));
  }, []);

  return <div>{children}</div>;
};

export default AuthWrapper;
