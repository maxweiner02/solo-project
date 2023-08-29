import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// eslint-disable-next-line no-unused-vars
import './styles/style.css';

const root = createRoot(document.getElementById('root'));

root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <App />,
);
