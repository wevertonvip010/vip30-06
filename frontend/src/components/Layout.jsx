import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AssistenteMirante from '../components/AssistenteMirante';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      
      {/* Assistente IA Mirante */}
      <AssistenteMirante />
    </div>
  );
};

export default Layout;

