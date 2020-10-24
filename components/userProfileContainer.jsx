import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';

const UserProfileContainer = ({ user }) => {
  const [email, setEmail] = React.useState(user.email);
  const [file, setFile] = React.useState('');

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChangeProfile = () => {
    console.log(file);
  };

  return (
    <Paper>
      <Box p={2} component='form'>
        <Typography variant='h4'>User</Typography>
        <TextField
          type='email'
          label='Email'
          margin='dense'
          placeholder='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant='outlined'
          fullWidth
        />
        <div
          style={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '350px',
          }}
        >
          <Avatar
            src={user.avatar}
            alt={user.email}
            style={{ marginTop: 5, width: 40, height: 40 }}
          />
          <TextField
            type='file'
            variant='outlined'
            margin='dense'
            onChange={handleFile}
          />
        </div>
        <Button
          onClick={handleChangeProfile}
          variant='contained'
          color='primary'
          fullWidth
        >
          Save Profile Information
        </Button>
      </Box>
    </Paper>
  );
};

export default UserProfileContainer;
