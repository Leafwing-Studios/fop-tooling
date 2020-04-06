import React from 'react'

export default function Spacer(props) {
  return(
    <div style={{
      height: props.height ? `${props.height}px` : '0px',
      width: props.width ? `${props.width}px` : '0px',
    }}/>
  );
}
