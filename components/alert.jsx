import React from 'react';

import { Alert } from '@material-ui/lab';
import { IconButton, Collapse } from '@material-ui/core';

const AlertComponent = ({ alert }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapse in={open} timeout={3000}>
      <Alert
        severity={alert.success ? 'success' : 'error'}
        action={
          <IconButton
            size='small'
            color='inherit'
            onClick={() => setOpen(false)}
          >
            X
          </IconButton>
        }
        style={{ marginBottom: 10 }}
        variant='filled'
      >
        {alert.msg}
      </Alert>
    </Collapse>
  );
};

export default AlertComponent;
