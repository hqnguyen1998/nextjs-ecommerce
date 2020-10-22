import MainLayout from '../layouts/mainLayout';
import { Formik, Form, Field } from 'formik';
import { TextField, SimpleFileUpload } from 'formik-material-ui';
import axios from 'axios';

import { Box, Paper, makeStyles, Button } from '@material-ui/core';
import FilesForm from '../components/filesForm';

const useStyles = makeStyles(() => ({
  inputTitle: {
    height: '200',
    fontWeight: 'bold',
    fontSize: 50,
  },
  inputTags: {
    height: 50,
    fontSize: 20,
  },
  inputContent: {
    fontSize: '25px',
    lineHeight: '2rem',
    fontWeight: '400',
    paddingTop: 10,
    color: '#08090a',
  },
}));

const CreatePost = () => {
  const classes = useStyles();
  const [files, setFiles] = React.useState(null);

  const handleSubmitPost = (values, { setSubmitting }) => {
    setTimeout(async () => {
      setSubmitting(false);
      const { data } = await axios({
        url: 'https://api.imgur.com/3/image',
        method: 'POST',
        headers: {
          Authorization: 'Client-ID 8a81ffd406a6030',
        },
        data: files,
      });

      const imageUrl = data.data.link;

      const newData = {
        image: imageUrl,
        ...values,
      };

      await axios({
        url: `${process.env.API_URL}/api/post`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: newData,
      });

      setSubmitting(true);
    }, 500);
  };

  const handleSetFiles = (value) => {
    setFiles(value);
  };

  return (
    <MainLayout title='Add your own post'>
      <Box component={Paper} p={5}>
        <Formik
          initialValues={{
            title: '',
            tags: '',
            body: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Required';
            }

            if (!values.body) {
              errors.body = 'Required';
            }

            return errors;
          }}
          onSubmit={handleSubmitPost}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <FilesForm files={files} setFiles={handleSetFiles} />
              <Field
                component={TextField}
                type='text'
                name='title'
                placeholder='New post title here...'
                margin='dense'
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    input: classes.inputTitle,
                  },
                }}
                autoFocus
                fullWidth
              />
              <Field
                component={TextField}
                name='tags'
                placeholder='Add up to 4 tags'
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    input: classes.inputTags,
                  },
                }}
                margin='dense'
                fullWidth
              />
              <Field
                component={TextField}
                name='body'
                placeholder='Write your post content here...'
                margin='dense'
                rows={20}
                variant='standard'
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    input: classes.inputContent,
                  },
                }}
                multiline
                fullWidth
              />

              <Button
                onClick={submitForm}
                type='submit'
                variant='contained'
                color='primary'
                disabled={isSubmitting}
              >
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  );
};

export default CreatePost;
