import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/Layout';
import './index.css'; // Ensure TailwindCSS is included

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Layout />
    </Router>
  </React.StrictMode>
);
