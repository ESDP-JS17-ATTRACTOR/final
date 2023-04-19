import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export const adminListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Студенты" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
       <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Преподаватели" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <AutoStoriesIcon />
      </ListItemIcon>
      <ListItemText primary="Курсы" />
    </ListItemButton>
  </>
);
