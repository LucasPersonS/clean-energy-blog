"use client";

import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className="bg-dark-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <button onClick={() => router.push('/')}>
          <Image
            src="/logo.png"
            alt="Energia Limpa Logo"
            width={80}
            height={80}
            className="rounded-md"
          />
        </button>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;