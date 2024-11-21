import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-primary text-dark-subtext p-4 text-center shadow-inner">
      <p>&copy; {new Date().getFullYear()} Energia Limpa Blog. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;