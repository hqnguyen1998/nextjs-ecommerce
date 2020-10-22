import MainLayout from '../layouts/mainLayout';
import { Formik, Form, Field } from 'formik';
import { InputBase } from 'formik-material-ui';
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
    fontSize: 30,
    lineHeight: '2rem',
    paddingTop: 10,
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

      const tags = values.tags.split(',');

      const newData = {
        image: imageUrl,
        tags: tags,
        ...values,
      };

      const uploadData = await axios({
        url: `${process.env.API_URL}/api/post`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: newData,
      });

      console.log(uploadData);
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
          onSubmit={handleSubmitPost}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <FilesForm files={files} setFiles={handleSetFiles} />
              <Field
                component={InputBase}
                type='text'
                name='title'
                placeholder='New post title here...'
                classes={{
                  input: classes.inputTitle,
                }}
                margin='dense'
                fullWidth
              />
              <Field
                component={InputBase}
                name='tags'
                placeholder='Add up to 4 tags'
                classes={{
                  input: classes.inputTags,
                }}
                margin='dense'
                fullWidth
              />
              <Field
                component={InputBase}
                name='body'
                placeholder='Write your post content here...'
                classes={{
                  input: classes.inputContent,
                }}
                margin='dense'
                rows={20}
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
