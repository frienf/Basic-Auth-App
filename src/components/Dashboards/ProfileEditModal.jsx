import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert } from '@mui/material';
import { useFormValidation } from '../../hooks/useFormValidation';

function ProfileEditModal({ open, onClose, user, onSave }) {
  const { formData, formErrors, handleChange, validateForm, isFormValid } = useFormValidation({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await onSave(formData);
        setError('');
      } catch (err) {
        setError('Failed to update profile');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!formErrors.username}
          helperText={formErrors.username}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileEditModal;
