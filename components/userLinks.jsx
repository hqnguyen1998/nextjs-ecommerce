import { Box, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';

const UserLinks = ({ links, onChange }) => {
  return (
    <Box component={Paper} p={2}>
      <Typography
        variant='h4'
        style={{
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        Links
      </Typography>
      <TextField
        name='facebook'
        variant='outlined'
        label='Facebook URL'
        margin='dense'
        value={links.facebook || ''}
        placeholder='https://facebook.com/...'
        onChange={onChange}
        fullWidth
      />
      <TextField
        name='instagram'
        variant='outlined'
        label='Instagram URL'
        margin='dense'
        value={links.instagram || ''}
        placeholder='https://instagram.com/...'
        onChange={onChange}
        fullWidth
      />
      <TextField
        name='youtube'
        variant='outlined'
        label='Youtube URL'
        margin='dense'
        value={links.youtube || ''}
        placeholder='https://youtube.com/channel/...'
        onChange={onChange}
        fullWidth
      />
      <TextField
        name='github'
        variant='outlined'
        label='Github URL'
        margin='dense'
        value={links.github || ''}
        placeholder='https://github.com/...'
        onChange={onChange}
        fullWidth
      />
      <TextField
        name='linkedIn'
        variant='outlined'
        label='LinkedIn URL'
        margin='dense'
        value={links.linkedIn || ''}
        placeholder='https://linkedin.com/in/...'
        onChange={onChange}
        fullWidth
      />
      <TextField
        name='stackOverFlow'
        variant='outlined'
        label='StackOverFlow URL'
        margin='dense'
        value={links.stackOverFlow || ''}
        placeholder='https://stackoverflow.com/users/...'
        onChange={onChange}
        fullWidth
      />
      <TextField
        name='medium'
        variant='outlined'
        label='Medium URL'
        margin='dense'
        value={links.medium || ''}
        placeholder='https://medium.com/@...'
        onChange={onChange}
        fullWidth
      />
      <TextField
        name='twitch'
        variant='outlined'
        label='Twitch URL'
        margin='dense'
        value={links.twitch || ''}
        placeholder='https://twitch.tv/...'
        onChange={onChange}
        fullWidth
      />
    </Box>
  );
};
export default UserLinks;
