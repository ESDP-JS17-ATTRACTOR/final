import React, { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filenames, setFilenames] = useState<string[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => file.name);
      setFilenames(filesArray);
    } else {
      setFilenames([]);
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input multiple style={{ display: 'none' }} type="file" name={name} onChange={onFileChange} ref={inputRef} />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField sx={{ width: '100%' }} disabled label={label} value={filenames} onClick={activateInput} />
        </Grid>
        <Grid item>
          <Button type="button" variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
