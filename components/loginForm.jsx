import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { loginWithEmailAndPassword } from '../redux/actions/userActions';

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const { email, password } = values;
          setSubmitting(false);
          dispatch(loginWithEmailAndPassword(email, password));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            type='email'
            label='Email address'
            name='email'
            margin='dense'
            fullWidth
          />
          <Field
            component={TextField}
            type='password'
            label='Password'
            name='password'
            margin='dense'
            fullWidth
          />

          <Button
            onClick={submitForm}
            variant='contained'
            color='primary'
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
