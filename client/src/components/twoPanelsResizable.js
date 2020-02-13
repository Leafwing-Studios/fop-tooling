import React, { Component } from 'react';
import {
  Typography,
  Drawer,
  TextField,
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

const minWidth = 200;
const maxWidth = 1500;

class TwoPanelsResizable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResizing: false,
      currentWidth: props.startingWidth || 650,
    }
    
    this.handleMousedown = e => {
      this.setState({ isResizing: true });
    };
  
    this.handleMousemove = e => {
      // we don't want to do anything if we aren't resizing.
      if (!this.state.isResizing) {
        return;
      }
  
      const newWidth = document.body.offsetWidth - e.clientX;
      if (newWidth > minWidth && newWidth < maxWidth) {
        this.setState({ currentWidth: newWidth });
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
  
  updateCurrentWidth(event) {
    // for the debug text box. don't use this for anything else
    this.setState({
      currentWidth: event.target.value
    });
  }
  
  render() {
    return (
      <div
        style={{
          // get drawer and other page stuff side by side
          display: 'flex',
          userSelect: this.state.isResizing ? 'none' : 'default', // prevents weird text highlighting stuff while resizing 
        }}
      >
      
        {
          // left panel stuff: "main content"
          this.props.children[0]
        }
        
        <Drawer
          variant="permanent"
          open
          style={{
            // important to set the width on both the drawer and the paper here so the rest of the page knows how to resize itself
            flexShrink: 0,
            width: `${this.state.currentWidth}px`,
          }}
          anchor='right'
          PaperProps={{ style: {
            width: `${this.state.currentWidth}px`,
            zIndex: 20,
            padding: 25,
          }}}
        >
          {/* this is to make sure that this doesn't overlap with the nav bar. We will make a better way to do this eventually (see toolbar class on navigationFrame) */}
          <div style={{padding: "32px"}} /> 
          
          <div 
            id="dragger"
            onMouseDown={event => {
              this.handleMousedown(event);
            }}
            style={{
              width: '5px',
              cursor: 'ew-resize',
              zIndex: '100',
              border: '1px solid #ddd',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              backgroundColor: '#eeeeee',
            }}
          >
          </div>
          {/*<TextField id="changeDrawerWidthEasy" label="Drawer Width" onChange={(event) => this.updateCurrentWidth(event)} />*/}
          {this.props.children[1]}
        </Drawer>
      </div>
    );
  }
}

export default TwoPanelsResizable;
