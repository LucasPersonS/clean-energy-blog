import React, { useState } from 'react';
import Image from 'next/image';
import { Post, Comment } from '../../app/types/Post';
import PostModal from './PostModal';
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from 'react-icons/ai';
import FollowButton from '../Utilitarios/FollowButton';

interface PostCardProps {
  post: Post;
  onVote: (type: 'like' | 'dislike') => void;
  onComment: (commentText: string) => void;
  hideCommentForm?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onVote, onComment, hideCommentForm }) => {
  const { author } = post;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // **Added: Manage comments state within PostCard**
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [commentInput, setCommentInput] = useState('');

  // **Renamed: State to control visibility of the comment form**
  const [isCommentFormHidden, setIsCommentFormHidden] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // **Added: Function to add a new comment**
  const addComment = (commentText: string) => {
    if (commentText.trim() === '') return;

    const newComment: Comment = {
      id: comments.length + 1, // Consider using UUID for unique IDs in production
      author: {
        name: author?.name,
        email: author?.email,
        avatarUrl: author?.avatarUrl, // Placeholder avatar
      },
      content: commentText,
      timestamp: new Date().toISOString(),
    };

    setComments([...comments, newComment]);
  };

  // Handle adding a comment from the inline form
  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment(commentInput.trim());
    setCommentInput('');
  };

  return (
    <>
      <div
        className="bg-dark-secondary border border-gray-700 p-6 rounded-2xl shadow-md hover:bg-dark-primary transition-shadow duration-300 cursor-pointer"
        onClick={handleOpenModal}
      >
        <header className="flex items-center space-x-4">
          <Image
            src={author?.avatarUrl || '/default-avatar.png'}
            alt={`${author?.name || 'Unknown'}'s avatar`}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <div className={`flex items-left ${isModalOpen ? 'pointer-events-none' : ''}`}>
            <h3 className="text-sm font-semibold text-dark-text">{author?.name || 'Desconhecido'}
              <FollowButton
                isFollowing={author?.isFollowing || false}
                onFollowChange={(isFollowing) => {
                  console.log(`User agora está ${isFollowing ? 'Seguindo' : 'Não seguindo'}`);
                }}
              />
            </h3>
            </div>
            <p className="text-sm text-gray-400">@{author?.email || 'unknown'}</p>
          </div>
        </header>

        <p className="mt-4 text-md text-dark-text break-words">
          {post.tweet}
        </p>

        {post.image && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt="Post image"
              width={800}
              height={450}
              className="w-72 h-auto object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-6 text-gray-400">
          <div className="flex space-x-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVote('like');
              }}
              className="flex items-center space-x-1 hover:text-lime-500 transition-colors"
            >
              <AiOutlineLike className="h-5 w-5" />
              <span>{post.likes}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onVote('dislike');
              }}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            >
              <AiOutlineDislike className="h-5 w-5" />
              <span>{post.dislikes}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal();
              }}
              className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
            >
              <AiOutlineComment className="h-5 w-5" />
              <span>{comments.length}</span>
            </button>
          </div>
        </div>

        {/* Certifique-se de que a seção de adicionar comentário inline está oculta quando o modal está aberto */}
        {!isModalOpen && !hideCommentForm && (
          <form onSubmit={handleAddComment} className="mt-4 flex space-x-3">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Adicionar um comentário..."
              className="flex-1 p-2 bg-dark-primary text-dark-text placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 border border-gray-700 sm:w-full md:w-3/4 lg:w-1/2"
            />
            <button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              className={`px-4 py-2 rounded-lg bg-lime-500 text-dark-primary font-medium hover:bg-lime-600 transition-colors ${
                commentInput.trim() ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!commentInput.trim()}
            >
              Postar
            </button>
          </form>
        )}
      </div>

      {/* **Updated: Pass comments and addComment to PostModal** */}
      {isModalOpen && (
        <PostModal
          post={post}
          comments={comments}
          addComment={addComment}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default PostCard;