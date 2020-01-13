import React from 'react';
import useStyles from '../styles';

import {
  Link,
  useRouteMatch,
} from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';

export default function DrawerLink(props) {
  const classes = useStyles()(); // what the fuck javascript 2 electric boogaloo 

  return (
    <Link to={props.routePath} className={classes.drawerLink}>
      <ListItem button key={props.buttonKey}>
        <ListItemIcon className={classes.drawerIcon}>
          {props.children}
        </ListItemIcon>
        <ListItemText primary={props.buttonText} />
      </ListItem>
    </Link>
  );
}
