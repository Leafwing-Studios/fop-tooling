import React, { Component } from 'react';

import {
  Typography,
  Link
} from '@material-ui/core';

export default function Home() {
  return (
    <>
      <Typography paragraph>
        Welcome to the official website for the Fonts of Power roleplaying system.
      </Typography>
      <Typography variant='h6'>
        Links
      </Typography>
      <ul>
        <li>
          <Link target='_blank' href='https://discord.gg/8kARYKJ'>
            Official Discord Server
          </Link>
        </li>
        <li>
          <Link target='_blank' href='https://drive.google.com/drive/u/0/folders/11ergxyGXK1vIjq3nMQCqItZs1h1-W7EF'>
            Google drive for rulebooks
          </Link>
        </li>
      </ul>
    </>
  );
}
