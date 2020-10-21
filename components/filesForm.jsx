import { useRef, useState } from 'react';
import { Button, InputBase } from '@material-ui/core';

const FilesForm = ({ files, setFiles }) => {
  const inputRef = useRef(null);

  let url = files && URL.createObjectURL(files);

  const handleOpen = () => {
    inputRef.current.click();
  };

  const handleOnChangeInputFile = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    inputRef.current.value = '';

    setFiles(null);
  };

  return (
    <div>
      {!url ? (
        <div>
          <Button variant='outlined' color='primary' onClick={handleOpen}>
            Add a cover image
          </Button>
        </div>
      ) : (
        <div>
          <img src={url} style={{ width: 250, display: 'block' }} />
          <br />
          <Button variant='outlined' color='primary' onClick={handleOpen}>
            Change
          </Button>
          <Button variant='text' color='secondary' onClick={handleRemoveFile}>
            Remove
          </Button>
        </div>
      )}

      <InputBase
        type='file'
        inputRef={inputRef}
        onChange={handleOnChangeInputFile}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FilesForm;
