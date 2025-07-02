import { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function QuickActions() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSettingsOpen = () => setSettingsOpen(true);
  const handleSettingsClose = () => setSettingsOpen(false);
  const handleAnalyticsOpen = () => setAnalyticsOpen(true);
  const handleAnalyticsClose = () => setAnalyticsOpen(false);

  return (
    <Box className="quick-actions">
      <Button className="action-button" onClick={() => navigate('/dashboard')}>
        Edit Profile
      </Button>
      <Button className="action-button" onClick={handleSettingsOpen}>
        View Settings
      </Button>
      <Button className="action-button" onClick={handleAnalyticsOpen}>
        View Analytics
      </Button>
      <Dialog open={settingsOpen} onClose={handleSettingsClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <p>Settings content goes here (e.g., theme, notifications).</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={analyticsOpen} onClose={handleAnalyticsClose}>
        <DialogTitle>Analytics</DialogTitle>
        <DialogContent>
          <p>Analytics content goes here (e.g., charts, user stats).</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAnalyticsClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default QuickActions;