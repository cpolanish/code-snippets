import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import StyledButton from '../../components/styledButton/StyledButton';
import InitialsAvatar from '../../components/initialsAvatar/InitialsAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import NotesWithEntry from '../../components/notes/NotesWithEntry';

function CaseView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState({});

  useEffect(() => {
    async function getCase() {
      setCaseData(await electron.getCase(id));
    }
    getCase();
  }, []);

  return (
    <section className="CaseViewForm">
      <div className="CaseViewForm-header">
        <h1 className="CaseHeader">
          <div>Case # {caseData.number}</div>
          <div>:</div>
          <div>{caseData.title}</div>
        </h1>
        <StyledButton
          onClick={() => navigate('/case')}
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          sx={{ minWidth: '100px' }}
        >
          Back
        </StyledButton>
      </div>
      {caseData.number && (
        <React.Fragment>
          <Box className="CaseData">
            <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px' }}>
              <TextField label="Date" defaultValue={caseData.date} InputProps={{ readOnly: true }} />
              <TextField label="End User" defaultValue={caseData.endUser} InputProps={{ readOnly: true }} />
            </Box>
            <TextField label="Status" defaultValue={caseData.stage} InputProps={{ readOnly: true }} />
            <TextField label="Assigned" defaultValue={caseData.assigned} InputProps={{ readOnly: true }} />
            <TextField
              label="Problem Description"
              multiline
              rows={4}
              defaultValue={caseData.problemDescription}
              InputProps={{ readOnly: true }}
            />
          </Box>
          <h2>Notes:</h2>
          <NotesWithEntry notes={caseData.notes} maxHeight="400px" />
        </React.Fragment>
      )}
    </section>
  );
}

export default CaseView;
