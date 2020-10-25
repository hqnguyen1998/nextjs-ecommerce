import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import axios from 'axios';
import { updateUserProfile } from '../redux/actions/userActions';

const UserProfileContainer = ({ profile, setProfile }) => {
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const isLoading = useSelector((state) => state.user.isLoading);
  const userProfile = useSelector((state) => state.user.loggedUser);

  const handleFile = (e) => {
    axios({
      url: 'https://api.imgur.com/3/image',
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 8a81ffd406a6030',
      },
      data: e.target.files[0],
    }).then((data) => {
      const avatarUrl = data.data.data.link;

      dispatch(updateUserProfile(userProfile._id, { avatar: avatarUrl }));

      inputRef.current.value = '';
    });
  };

  return (
    userProfile && (
      <Paper>
        <Box p={2}>
          <Typography variant='h4'>User</Typography>
          <TextField
            name='email'
            type='email'
            label='Email'
            margin='dense'
            placeholder='Email Address'
            value={profile.email || ''}
            onChange={(e) =>
              setProfile((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            variant='outlined'
            required
            fullWidth
          />
          <div
            style={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%',
            }}
          >
            <Avatar
              src={userProfile.avatar}
              alt={userProfile.email}
              style={{ marginTop: 5, marginRight: 5, width: 40, height: 40 }}
            />
            <TextField
              type='file'
              inputRef={inputRef}
              variant='outlined'
              margin='dense'
              inputProps={{
                accept: 'image/*',
              }}
              disabled={isLoading && true}
              onChange={handleFile}
              fullWidth
            />
          </div>
        </Box>
      </Paper>
    )
  );
};

export default UserProfileContainer;
