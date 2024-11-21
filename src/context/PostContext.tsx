import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '../app/types/Post';
import { Comment } from '../app/types/Comment';
import { mockPosts } from '../data/mockPosts';

/**
 * Defines the shape of the PostContext.
 */
type PostContextType = {
  posts: Post[];
  updatePost: (updatedPost: Post) => void;
  addPost: (newPost: Post) => void;
  addComment: (postId: number, commentText: string) => void;
  votePost: (postId: number, type: 'like' | 'dislike') => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

/**
 * PostProvider component that wraps around parts of the app that need access to post state.
 */
export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  /**
   * Updates an existing post.
   * @param updatedPost - The post with updated data.
   */
  const updatePost = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  /**
   * Adds a new post.
   * @param newPost - The new post to add.
   */
  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  /**
   * Adds a comment to a specific post.
   * @param postId - The ID of the post to comment on.
   * @param commentText - The text of the comment.
   */
  const addComment = (postId: number, commentText: string) => {
    const newComment: Comment = {
      id: Date.now(),
      postId,
      author: {
        id: 'user1',
        name: 'Lucas',
        email: 'lucas@example.com',
        avatarUrl: '/avatars/avatar1.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      content: commentText,
      timestamp: new Date().toISOString(),
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  /**
   * Votes on a specific post.
   * @param postId - The ID of the post to vote on.
   * @param type - The type of vote ('like' or 'dislike').
   */
  const votePost = (postId: number, type: 'like' | 'dislike') => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: type === 'like' ? post.likes + 1 : post.likes,
              dislikes: type === 'dislike' ? post.dislikes + 1 : post.dislikes,
            }
          : post
      )
    );
  };

  return (
    <PostContext.Provider value={{ posts, updatePost, addPost, addComment, votePost }}>
      {children}
    </PostContext.Provider>
  );
};

/**
 * Custom hook to access PostContext.
 */
export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
