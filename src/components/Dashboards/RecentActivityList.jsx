import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

function RecentActivityList() {
  const mockActivities = [
    { id: 1, action: 'Logged in', timestamp: '2025-07-02 17:00:00' },
    { id: 2, action: 'Updated profile', timestamp: '2025-07-01 14:30:00' },
    { id: 3, action: 'Signed up', timestamp: '2025-06-30 09:15:00' },
  ];

  return (
    <Box className="activity-list">
      <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
        Recent Activity
      </Typography>
      <List>
        {mockActivities.map((activity) => (
          <ListItem key={activity.id} className="activity-item">
            <ListItemText
              primary={activity.action}
              secondary={activity.timestamp}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default RecentActivityList;