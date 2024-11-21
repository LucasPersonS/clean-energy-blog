import React, { useEffect, useState } from 'react';
import { Post, Comment } from '../../app/types/Post';
import { AiOutlineClose } from 'react-icons/ai';
import PostCard from './PostCard';

interface PostModalProps {
  post: Post;
  comments: Comment[];
  addComment: (commentText: string) => void;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, comments, addComment, onClose }) => {
  const [newComment, setNewComment] = useState('');

  // Close modal on outside click
  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'modal-overlay') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle input change
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    addComment(newComment.trim());
    setNewComment('');
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <div className="bg-dark-secondary text-dark-text rounded-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close Modal"
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>
        
        {/* Render PostCard without the inline comment form */}
        <div className="pointer-events-none">
          <PostCard 
            post={post} 
            onVote={() => {}} 
            onComment={() => {}} 
            hideCommentForm 
          />
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-4">Comentários</h4>
          <ul className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {comments.map((comment) => (
              <li key={comment.id} className="border-b border-gray-700 pb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={comment.author.avatarUrl}
                    alt={`Avatar de ${comment.author.name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-semibold text-lg">{comment.author.name}</span>
                    <span className="text-sm text-gray-400 ml-2">@{comment.author.email}</span>
                  </div>
                </div>
                <p className="mt-2 text-md text-dark-text break-words">{comment.content}</p>
                <span className="mt-1 text-xs text-gray-400">{new Date(comment.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddComment();
            }}
            className="mt-4 flex space-x-3"
          >
            <input
              type="text"
              placeholder="Adicionar um comentário..."
              className="flex-1 p-2 bg-dark-primary text-dark-text placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-900 border border-gray-700"
              value={newComment}
              onChange={handleCommentChange}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-lime-400 text-dark-primary font-medium hover:bg-lime-600 transition-colors disabled:opacity-30 cursor-pointer"
              disabled={newComment.trim() === ''}
            >
              Postar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostModal;