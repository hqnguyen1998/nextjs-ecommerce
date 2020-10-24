import {
  Box,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import React from 'react';

const BasicUserProfile = () => {
  const [ShowEmailProfile, setShowEmailProfile] = React.useState(false);

  return (
    <Paper>
      <Box p={2}>
        <Typography variant='h4'>Basic</Typography>
        <TextField
          placeholder='A short bio'
          label='Summary'
          variant='outlined'
          multiline
          margin='dense'
          rows={5}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={ShowEmailProfile}
              onChange={() => setShowEmailProfile((prevState) => !prevState)}
              name='displayEmail'
            />
          }
          label='Display email on profile'
        />
        <TextField
          label='Name'
          placeholder='Full Name'
          variant='outlined'
          margin='dense'
          fullWidth
        />
        <TextField
          label='Location'
          placeholder='Chicago, Illinois'
          variant='outlined'
          margin='dense'
          fullWidth
        />
        <TextField
          label='Website URL'
          placeholder='https://yoursite.com'
          variant='outlined'
          margin='dense'
          fullWidth
        />
      </Box>
    </Paper>
  );
};

export default BasicUserProfile;
