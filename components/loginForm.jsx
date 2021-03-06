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
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
          errors.email = 'Invalid email';
        }

        if (!values.password) {
          errors.password = 'Required';
        }

        return errors;
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
