import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ProfileEditModal from './ProfileEditModal';
import { useAuth } from '../../context/AuthContext';

function UserProfileCard({ user }) {
  const [open, setOpen] = useState(false);
  const { updateUser } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (updatedData) => {
    try {
      await updateUser(updatedData);
      handleClose();
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  return (
    <Box className="profile-card">
      <Box className="profile-avatar">
        {user?.username?.charAt(0)?.toUpperCase() || 'U'}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {user?.username || 'User'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user?.email || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Auth Source: {user?.authSource || 'email'}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        className="action-button"
        onClick={handleOpen}
      >
        Edit Profile
      </Button>
      <ProfileEditModal
        open={open}
        onClose={handleClose}
        user={user}
        onSave={handleSave}
      />
    </Box>
  );
}

export default UserProfileCard;