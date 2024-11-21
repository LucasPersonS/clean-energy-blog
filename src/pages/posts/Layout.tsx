import React from 'react';
import HeaderPost from '../../components/Posts/HeaderPost';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPost />
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;