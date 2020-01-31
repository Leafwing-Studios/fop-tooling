import React, { Component } from 'react';
import {
  Typography,
  Drawer,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Lipsum from '../components/lipsum';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
  },
  dragger: {
    width: '5px',
    cursor: 'ew-resize',
    padding: '4px 0 0',
    borderTop: '1px solid #ddd',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: '100',
    backgroundColor: '#f4f7f9'
  }
});

class ResizableDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResizing: false,
      lastDownX: 0,
      newWidth: {}
    }
    
    this.handleMousedown = e => {
      this.setState({ isResizing: true, lastDownX: e.clientX });
    };
  
    this.handleMousemove = e => {
      // we don't want to do anything if we aren't resizing.
      if (!this.state.isResizing) {
        return;
      }
  
      let offsetRight =
        document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
      let minWidth = 50;
      let maxWidth = 1500;
      if (offsetRight > minWidth && offsetRight < maxWidth) {
        this.setState({ newWidth: { width: offsetRight } });
      }
    };
  
    this.handleMouseup = e => {
      this.setState({ isResizing: false });
    };
  }
  
  componentDidMount() {
    document.addEventListener('mousemove', e => this.handleMousemove(e));
    document.addEventListener('mouseup', e => this.handleMouseup(e));
  }
  
  render() {
    const {classes} = this.props;
    
    return (
      <Drawer
        variant="permanent"
        open
        anchor={'right'}
        classes={{
          paper: classes.drawerPaper
        }}
        PaperProps={{ style: this.state.newWidth }}
      >
        <div
          id="dragger"
          onMouseDown={event => {
            this.handleMousedown(event);
          }}
          className={classes.dragger}
        />
        <Lipsum />
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResizableDrawer);
