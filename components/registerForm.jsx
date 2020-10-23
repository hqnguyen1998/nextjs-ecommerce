import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { registerUser } from '../redux/actions/userActions';

const RegisterForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      }}
      validate={(values) => {
        const errors = {};

        if (!values.first_name) {
          errors.first_name = 'Required';
        }

        if (!values.last_name) {
          errors.last_name = 'Required';
        }

        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
          errors.email = 'Invalid email';
        }

        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 8) {
          errors.password =
            'Password length must at least 8 or more characters';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          setSubmitting(false);
          dispatch(registerUser(values));

          resetForm({ values: '' });
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            type='text'
            label='First Name'
            name='first_name'
            margin='dense'
            fullWidth
          />
          <Field
            component={TextField}
            type='text'
            label='Last Name'
            name='last_name'
            margin='dense'
            fullWidth
          />
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

export default RegisterForm;
