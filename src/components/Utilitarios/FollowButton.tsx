import React, { useState } from 'react';

interface FollowButtonProps {
  isFollowing: boolean;
  onFollowChange: (isFollowing: boolean) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing, onFollowChange }) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollowClick = () => {
    setFollowing(!following);
    onFollowChange(!following);
  };

  return (
    <button
      onClick={handleFollowClick}
      className={`px-2 py-0 ml-4 rounded-lg font-medium transition-colors ${
        following ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-lime-500 text-dark-primary hover:bg-lime-600'
      }`}
    >
      {following ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
