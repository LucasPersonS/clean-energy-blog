import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Posts', href: '/posts' },
    { name: 'Votados', href: '/featured' },
    { name: 'Quiz', href: '/quiz' },
    { name: 'Login', href: '/auth/login' },
    { name: 'Registrar', href: '/auth/register' },
  ];

  return (
    <nav>
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-dark-text hover:text-dark-accent transition-colors font-medium"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;