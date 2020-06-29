import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import useStyles from '../styles';
import { connect } from 'react-redux';
import { getUser } from '../redux/selectors';

import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  LocalOffer as TagIcon,
  Gavel as RuleIcon,
  AccountCircle as UserIcon,
  Settings as SettingsIcon,
  AlarmOn as InitIcon,
  Pets as MonsterBuilderIcon,
} from '@material-ui/icons';

import RouterBase from './RouterBase';
import DrawerLink from './DrawerLink';

function NavigationFrame(props) {
  const classes = useStyles()(); // what the fuck javascript
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx({
          [classes.appBar]: !open,
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Fonts of Power Searchable Database
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {classes.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <DrawerLink buttonKey='home' buttonText='Home' routePath='/'>
            <HomeIcon />
          </DrawerLink>
          <DrawerLink buttonKey='affixes' buttonText='Affixes' routePath='/affixes'>
            <TagIcon />
          </DrawerLink>
          <DrawerLink buttonKey='affixes' buttonText='Initiative Tracker' routePath='/init'>
            <InitIcon />
          </DrawerLink>
          {/* the monster builder will return...
          <DrawerLink buttonKey='monsterBuilder' buttonText='Monster Builder' routePath='/monsterBuilder'>
            <MonsterBuilderIcon />
          </DrawerLink>
          */}
          {/* the rules page will return....
          <DrawerLink buttonKey='rules' buttonText='Rules' routePath='/rules'>
            <RuleIcon />
          </DrawerLink>
          */}
        </List>
        <Divider />
        <List>
          <DrawerLink 
						buttonKey='user' 
						buttonText={props.user.id ? 'Profile' : 'Log In'} 
						routePath={props.user.id ? '/profile' : '/login'}
					>
            <UserIcon />
          </DrawerLink>
          <DrawerLink buttonKey='settings' buttonText='Settings' routePath='/settings'>
            <SettingsIcon />
          </DrawerLink>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <RouterBase />
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
	user: getUser(state)
});

export default connect(
	mapStateToProps
)(NavigationFrame);
