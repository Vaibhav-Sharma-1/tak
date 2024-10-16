// src/components/Layout.js
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        {children} {/* This will render the content for each specific page */}
      </div>
    </div>
  );
};

export default Layout;
