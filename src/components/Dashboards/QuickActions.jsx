import { Box, Button } from '@mui/material';

function QuickActions() {
  return (
    <Box className="quick-actions">
      <Button className="action-button">
        Edit Profile
      </Button>
      <Button className="action-button">
        View Settings
      </Button>
      <Button className="action-button">
        View Analytics
      </Button>
    </Box>
  );
}

export default QuickActions;