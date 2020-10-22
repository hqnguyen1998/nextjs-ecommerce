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
          <Button variant='outlined' color='inherit' onClick={handleOpen}>
            Add a cover image
          </Button>
        </div>
      ) : (
        <div>
          <img
            src={url}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
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
        name='file'
        accept='image/*'
        inputRef={inputRef}
        onChange={handleOnChangeInputFile}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FilesForm;
