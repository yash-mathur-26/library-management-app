import React from 'react';
import { List, ListItem, ListItemText, Drawer, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => (
    <Drawer variant="permanent" sx={{ width: 240 }}>
        <Toolbar />
        <List>
        <ListItem component={NavLink} to="/admin/books">
            <ListItemText primary="Books List" />
        </ListItem>
        <ListItem component={NavLink} to="/admin/assigned-books">
            <ListItemText primary="Assigned Books" />
        </ListItem>
        </List>
    </Drawer>
);

export default Sidebar;
