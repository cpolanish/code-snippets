import React from 'react';
import Notes from './Notes';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import InitialsAvatar from '../initialsAvatar/InitialsAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlaneTop } from '@fortawesome/pro-solid-svg-icons';

function NotesWithEntry({ notes, maxHeight }) {
  return (
    <Box className="notes-container" sx={{ maxHeight }}>
      <Notes notes={notes} />
      <TextField
        placeholder="Add a note..."
        sx={{ m: 1, div: { borderRadius: '50px' }, input: { margin: '0 8px' } }}
        InputProps={{
          startAdornment: <InitialsAvatar name="Christopher Polanish" />,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <FontAwesomeIcon icon={faPaperPlaneTop} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default NotesWithEntry;
