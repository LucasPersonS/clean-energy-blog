import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { usePosts } from '../../context/PostContext';
import { Post } from '../../app/types/Post';
import Image from 'next/image';
import Skeleton from '../Utilitarios/Skeleton';
import { useAuth } from '../../context/AuthContext';

const CircularProgress: React.FC<{ maxChars: number; currentChars: number }> = ({ maxChars, currentChars }) => {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const progress = (currentChars / maxChars) * circumference;

  return (
    <svg width="40" height="40" className="transform -rotate-90">
      <circle
        cx="20"
        cy="20"
        r={radius}
        stroke="#657786"
        strokeWidth="3"
        fill="transparent"
      />
      <circle
        cx="20"
        cy="20"
        r={radius}
        stroke="#00ff7f"
        strokeWidth="3"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
      />
    </svg>
  );
};

const CreatePost: React.FC = () => {
  const { addPost } = usePosts();
  const { user } = useAuth();
  const [tweet, setTweet] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const maxChars = 400;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Debugging Logs
    console.log('Tweet:', tweet);
    console.log('Trimmed Tweet:', tweet.trim());
    console.log('Image:', image);
    console.log('User:', user);

    if ((tweet.trim() || image) && tweet.trim().length <= maxChars && user) {
      setIsSubmitting(true);
      setTimeout(() => {
        const newPost: Post = {
          id: Date.now(),
          author: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            avatarUrl: user.avatarUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          tweet,
          image: image ? URL.createObjectURL(image) : undefined,
          likes: 0,
          dislikes: 0,
          comments: [],
        };
        addPost(newPost);
        setTweet('');
        setImage(null);
        setIsSubmitting(false);
      }, 1500); // 1.5 seconds delay
    } else {
      alert('Apenas texto ou imagem, por favor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-secondary p-5 rounded-xl shadow-md">
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        placeholder="O que está acontecendo?"
        className="w-full p-3 bg-dark-primary text-dark-text placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 border border-gray-700 resize-none"
        rows={4}
        maxLength={maxChars}
        disabled={isSubmitting}
      />
      {image && (
        <div className="mt-4 relative">
          <Image
            src={URL.createObjectURL(image)}
            alt="Selected"
            width={800}
            height={450}
            className="w-28 h-auto rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-90 transition-colors"
            aria-label="Remove Image"
            disabled={isSubmitting}
          >
            &times;
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center space-x-2">
          <label htmlFor="image-upload" className="cursor-pointer text-gray-400 hover:text-gray-200">
            <FaImage className="h-6 w-6" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isSubmitting}
          />
        </div>
        <CircularProgress maxChars={maxChars} currentChars={tweet.length} />
      </div>
      <div className="flex justify-end items-center mt-3">
        <span className="text-sm text-gray-400">{tweet.length}/{maxChars}</span>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className={`bg-lime-500 text-dark-primary px-6 py-2 rounded-full font-semibold hover:bg-lime-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
          disabled={tweet.length > maxChars || (!tweet.trim() && !image) || isSubmitting}
        >
          {isSubmitting ? (
            <Skeleton width="60px" height="24px" borderRadius="9999px" />
          ) : (
            'Postar'
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;