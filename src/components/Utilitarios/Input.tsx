import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 mb-4 border border-gray-300 rounded"
    />
  );
};

export default Input;