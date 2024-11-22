import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePosts } from '../../context/PostContext';
import PostList from '../../components/Posts/PostList';
import CreatePost from '../../components/Posts/CreatePost';
import ImageUploadButton from '../../components/Posts/ImageUploadButton';
import Layout from '../posts/Layout';
import Skeleton from '../../components/Utilitarios/Skeleton';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { posts, isLoading: postsLoading } = usePosts();
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>("Essa bio é só um exemplo, você pode editar.");
  const [contactInfo, setContactInfo] = useState<string | null>("contact@example.com");
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([
    { platform: "Github", url: "https://github.com/username" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/username" },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedImage = localStorage.getItem('profileImage');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.nome);
        if (storedImage) {
          setProfileImage(storedImage);
        }
        setIsProfileLoading(false);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem('user');
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  if (isProfileLoading || postsLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-8">
          <div className="bg-dark-secondary bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-lg">
            {/* Profile Skeleton */}
            <div className="flex flex-col items-center">
              <Skeleton width="144px" height="144px" borderRadius="9999px" className="mb-6" />
              <Skeleton width="60%" height="24px" className="mb-4" />
              <Skeleton width="80%" height="16px" className="mb-4" />
              <div className="flex space-x-4 mb-6">
                <Skeleton width="80px" height="32px" borderRadius="9999px" />
                <Skeleton width="80px" height="32px" borderRadius="9999px" />
              </div>
            </div>
            {/* CreatePost Skeleton */}
            <div className="mt-10 w-full max-w-lg">
              <div className="bg-dark-secondary p-5 rounded-xl shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <Skeleton width="30%" height="20px" />
                </div>
                <Skeleton width="100%" height="80px" className="mb-4" />
                <Skeleton width="80%" height="20px" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const userPosts = posts.filter(post => post.author.nome === userName);

  const handleSave = () => {
    localStorage.setItem('bio', bio || '');
    localStorage.setItem('contactInfo', contactInfo || '');
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-8 py-12">
        <div className="bg-dark-secondary bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-4xl font-bold mb-8 text-center">Perfil</h2>
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-36 h-36 rounded-full mb-6 shadow-lg" />
          ) : (
            <div className="w-36 h-36 bg-gray-600 rounded-full mb-6 flex items-center justify-center relative group shadow-lg">
              <span className="text-gray-300">No Image</span>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                <ImageUploadButton 
                  onImageSelect={(file: File) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfileImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }} 
                />
              </div>
            </div>
          )}
          <p className="text-2xl mb-6 font-semibold">{userName}</p>
          {isEditing ? (
            <>
              <textarea
                className="w-full p-2 mb-4 bg-dark-primary rounded"
                value={bio || ''}
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 mb-4 bg-dark-primary rounded"
                value={contactInfo || ''}
                onChange={(e) => setContactInfo(e.target.value)}
              />
              {socialLinks.map((link, index) => (
                <div key={index} className="flex mb-4">
                  <input
                    type="text"
                    className="w-1/2 p-2 bg-dark-primary rounded mr-2"
                    value={link.platform}
                    onChange={(e) => {
                      const newLinks = [...socialLinks];
                      newLinks[index].platform = e.target.value;
                      setSocialLinks(newLinks);
                    }}
                  />
                  <input
                    type="text"
                    className="w-1/2 p-2 bg-dark-primary rounded"
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...socialLinks];
                      newLinks[index].url = e.target.value;
                      setSocialLinks(newLinks);
                    }}
                  />
                </div>
              ))}
              <button
                onClick={handleSave}
                className="w-full bg-lime-500 text-dark-primary py-2 px-4 rounded-md hover:bg-lime-600 transition-colors shadow-sm mb-4 text-sm"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="text-lg mb-4">{bio}</p>
              <p className="text-sm mb-4">Contact: {contactInfo}</p>
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-600">
                    {link.platform}
                  </a>
                ))}
              </div>
            </>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors shadow-sm mb-4 text-sm"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('profileImage');
              router.push('/auth/login');
            }}
            className="w-full bg-lime-500 text-dark-primary py-2 px-4 rounded-md hover:bg-lime-600 transition-colors shadow-sm text-sm"
          >
            Sair
          </button>
        </div>

        <div className="mt-10 w-full max-w-lg">
          <CreatePost />
          <hr className="border-t border-gray-500 my-8" />
          <PostList posts={userPosts} />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;