import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '0.25rem',
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-700 ${className}`}
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Skeleton;