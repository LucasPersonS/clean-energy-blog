import React from 'react';
import { FaImage } from 'react-icons/fa';

interface ImageUploadButtonProps {
  onImageSelect: (file: File) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onImageSelect }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="image-upload" className="cursor-pointer text-gray-400 hover:text-gray-200 flex items-center">
        <FaImage className="h-6 w-6 mr-2" />
        <span>Upload Image</span>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadButton;