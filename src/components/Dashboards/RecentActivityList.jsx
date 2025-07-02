import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function RecentActivityList() {
  const [filter, setFilter] = useState('all');
  const mockActivities = [
    { id: 1, action: 'Logged in', type: 'login', timestamp: '2025-07-02 17:00:00' },
    { id: 2, action: 'Updated profile', type: 'profile', timestamp: '2025-07-01 14:30:00' },
    { id: 3, action: 'Signed up', type: 'signup', timestamp: '2025-06-30 09:15:00' },
    { id: 4, action: 'Logged in', type: 'login', timestamp: '2025-06-29 12:00:00' },
  ];

  const filteredActivities = filter === 'all'
    ? mockActivities
    : mockActivities.filter(activity => activity.type === filter);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Box className="activity-list">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Recent Activity
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="login">Login</MenuItem>
            <MenuItem value="profile">Profile Updates</MenuItem>
            <MenuItem value="signup">Signup</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <List>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <ListItem key={activity.id} className="activity-item">
              <ListItemText
                primary={activity.action}
                secondary={activity.timestamp}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No activities found for this filter.
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default RecentActivityList;