import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';

const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          console.log(values);
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
