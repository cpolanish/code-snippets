import React, { useEffect, useRef, useState } from 'react';
import { Box, List, ListItem, ListItemAvatar, Typography } from '@mui/material';
import InitialsAvatar from '../initialsAvatar/InitialsAvatar';

function Notes({ notes }) {
  const notesRef = useRef(null);

  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);

  useEffect(() => {
    notesRef.current.scrollTop = notesRef.current.scrollHeight;
  }, []);

  function handleScroll() {
    const scrollTop = notesRef.current.scrollTop;
    const scrollBottom = notesRef.current.scrollHeight - notesRef.current.clientHeight - scrollTop;
    setShowTopGradient(scrollTop > 0);
    setShowBottomGradient(scrollBottom > 0);
  }

  function wrapMentions(note) {
    const parts = note.split(/(@\".*?\")/);
    return parts.map((part, index) =>
      part.startsWith('@') ? (
        <span key={index} className="mention">
          {part.replace(/"/g, '')}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <Box
      className={`note-list-container topGradient bottomGradient ${showTopGradient ? 'showTopGradient' : ''} ${
        showBottomGradient ? 'showBottomGradient' : ''
      }`}
    >
      <List ref={notesRef} className="note-list" onScroll={handleScroll}>
        {notes.map((note) => (
          <React.Fragment key={note.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar sx={{ m: 0 }}>
                <InitialsAvatar name={note.author} />
              </ListItemAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Box className="note-header" color="grey.300">
                  <Typography className="note-author">{note.author}</Typography>
                  <Typography className="note-date">{note.date}</Typography>
                </Box>
                <Typography color="grey.main">{wrapMentions(note.note)}</Typography>
              </Box>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default Notes;
