import React, { Component } from 'react';
import {
  Typography,
  Drawer,
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
} from '@material-ui/icons';
import Lipsum from '../components/lipsum';

const drawerWidth = 300;

class ResponsiveDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResizing: false,
      lastDownX: 0,
      currentWidth: 600,
    }
  }
  
  render() {
    return (
      <div>
        <Drawer
          variant="permanent"
          open
          anchor={'right'}
          PaperProps={{ style: {
            width: this.state.currentWidth,
            zIndex: 20,
            flexGrow: 1,
            padding: 10,
          }}}
        >
          <div style={{padding: "10px"}}>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Lipsum />
        </Drawer>
      </div>
    );
  }
}

export default ResponsiveDrawer;
