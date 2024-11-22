import React from 'react';
import PostCard from './PostCard';
import { Post } from '../../app/types/Post';
import { usePosts } from '../../context/PostContext';
import Skeleton from '../Utilitarios/Skeleton';

interface PostListProps {
  posts?: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { votePost, addComment, isLoading } = usePosts();
  const displayedPosts = posts || usePosts().posts;

  const handleVote = (postId: number, type: 'like' | 'dislike') => {
    votePost(postId, type);
  };

  const handleComment = (postId: number, commentText: string) => {
    addComment(postId, commentText);
  };

  if (isLoading) {
    // Display 3 skeleton PostCards as placeholders
    return (
      <div className="space-y-4 mt-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-dark-secondary p-6 rounded-2xl shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
              <div className="flex-1 space-y-2">
                <Skeleton width="30%" height="20px" />
                <Skeleton width="50%" height="15px" />
              </div>
            </div>
            <Skeleton width="80%" height="20px" className="mt-4" />
            <Skeleton width="100%" height="150px" className="mt-4" />
            <div className="flex justify-between items-center mt-6">
              <Skeleton width="60px" height="20px" />
              <Skeleton width="50px" height="20px" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {displayedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onVote={(type) => handleVote(post.id, type)}
          onComment={(commentText: string) => handleComment(post.id, commentText)}
        />
      ))}
    </div>
  );
};

export default PostList;