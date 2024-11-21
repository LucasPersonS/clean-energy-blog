import React from 'react';
import PostCard from './PostCard';
import { Post } from '../../app/types/Post';
import { usePosts } from '../../context/PostContext';

interface PostListProps {
  posts?: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { votePost, addComment } = usePosts();
  const displayedPosts = posts || usePosts().posts;

  const handleVote = (postId: number, type: 'like' | 'dislike') => {
    votePost(postId, type);
  };

  const handleComment = (postId: number, commentText: string) => {
    addComment(postId, commentText);
  };

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