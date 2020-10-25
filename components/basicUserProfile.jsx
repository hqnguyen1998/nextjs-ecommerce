import {
  Box,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import React from 'react';

const BasicUserProfile = ({ profile, setProfile }) => {
  const handleChangeInput = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Paper>
      <Box p={2}>
        <Typography variant='h4'>Basic</Typography>
        <TextField
          name='summary'
          placeholder='A short bio'
          label='Summary'
          variant='outlined'
          multiline
          margin='dense'
          value={profile.summary}
          onChange={handleChangeInput}
          rows={5}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={profile.showEmail}
              onChange={() =>
                setProfile({ ...profile, showEmail: !profile.showEmail })
              }
              name='displayEmail'
            />
          }
          label='Display email on profile'
        />
        <TextField
          name='first_name'
          label='First Name'
          placeholder='Given name'
          value={profile.first_name}
          variant='outlined'
          margin='dense'
          onChange={handleChangeInput}
          fullWidth
        />
        <TextField
          name='last_name'
          label='Last Name'
          placeholder='Family name'
          value={profile.last_name}
          variant='outlined'
          margin='dense'
          onChange={handleChangeInput}
          fullWidth
        />
        <TextField
          name='location'
          label='Location'
          placeholder='Chicago, Illinois'
          variant='outlined'
          value={profile.location}
          margin='dense'
          onChange={handleChangeInput}
          fullWidth
        />
        <TextField
          name='website'
          label='Website URL'
          placeholder='https://yoursite.com'
          variant='outlined'
          margin='dense'
          value={profile.website}
          onChange={handleChangeInput}
          fullWidth
        />
      </Box>
    </Paper>
  );
};

export default BasicUserProfile;
