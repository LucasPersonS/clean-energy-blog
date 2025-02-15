import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;