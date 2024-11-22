'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoFlame, GoHeart, GoPerson, GoHome } from "react-icons/go";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../Utilitarios/Skeleton';

const HeaderPost: React.FC = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      {/* Sidebar for large screens */}
      <header className="hidden md:flex bg-dark-secondary fixed h-full z-50 flex-col items-start py-4 px-4 border-r border-gray-900">
        <div className="mb-8">
          <button onClick={() => router.push('/')}>
            <Image
              src="/logo.png"
              alt="Energia Limpa Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </button>
        </div>
        <nav className="flex flex-col items-start justify-center flex-grow space-y-8">
        <button onClick={() => router.push('/posts')} className="flex items-center text-white hover:text-lime-500">
            <GoHome size={32} className="mr-2" />
            <span>Home</span>
          </button>
          <button onClick={() => router.push('/quiz')} className="flex items-center text-white hover:text-lime-500">
            <GoFlame size={32} className="mr-2" />
            <span>Quiz</span>
          </button>
          <button onClick={() => router.push('/featured')} className="flex items-center text-white hover:text-lime-500">
            <GoHeart size={32} className="mr-2" />
            <span>Mais Votados</span>
          </button>
          <button onClick={() => router.push('/profile')} className="flex items-center text-white hover:text-lime-500">
            <GoPerson size={32} className="mr-2" />
            <span>{user?.nome || 'Perfil'}</span>
          </button>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="flex md:hidden bg-black shadow-md fixed w-full z-50 items-center justify-between px-4 py-4">
        <button onClick={() => router.push('/')}>
          <Image
            src="/logo.png"
            alt="Logo Energia Limpa"
            width={40}
            height={40}
            className="rounded-full"
          />
        </button>
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden fixed top-16 left-0 w-full bg-black shadow-md z-40">
          <div className="flex flex-col items-start p-4 space-y-4">
            <button onClick={() => { router.push('/'); toggleMobileMenu(); }} className="flex items-center text-white hover:text-lime-500">
              <GoFlame size={24} className="mr-2" />
              <span>Quiz</span>
            </button>
            <button onClick={() => { router.push('/featured'); toggleMobileMenu(); }} className="flex items-center text-white hover:text-lime-500">
              <GoHeart size={24} className="mr-2" />
              <span>Mais Votados</span>
            </button>
            <button onClick={() => { router.push('/profile'); toggleMobileMenu(); }} className="flex items-center text-white hover:text-lime-500">
              <GoPerson size={24} className="mr-2" />
              <span>{user?.nome || 'Perfil'}</span>
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default HeaderPost;