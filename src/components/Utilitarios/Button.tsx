import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-dark-secondary text-dark-text font-semibold py-2 px-6 rounded-full shadow-md-dark hover:bg-dark-accent transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default Button;