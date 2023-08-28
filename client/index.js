import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// import styles from './scss/application.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <App />,
);
