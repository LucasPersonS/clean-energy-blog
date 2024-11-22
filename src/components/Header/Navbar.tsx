import React from 'react';
import Link from 'next/link';
import { GoSignIn, GoSignOut } from 'react-icons/go';

const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Posts', href: '/posts' },
    { name: 'Votados', href: '/featured' },
    { name: 'Quiz', href: '/quiz' },
    { name: 'Integrantes', href: '/integrantes' },
    { name: 'Registrar', href: '/auth/register', icon: <GoSignOut /> },
  ];

  return (
    <nav>
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.name} className="flex items-center">
            <Link
              href={item.href}
              className="flex items-center text-dark-text hover:text-dark-accent transition-colors font-medium"
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;