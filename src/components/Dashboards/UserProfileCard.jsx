import { Box, Typography } from '@mui/material';

function UserProfileCard({ user }) {
  return (
    <Box className="profile-card">
      <Box className="profile-avatar">
        {user?.username?.charAt(0)?.toUpperCase() || 'U'}
      </Box>
      <Box>
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
    </Box>
  );
}

export default UserProfileCard;