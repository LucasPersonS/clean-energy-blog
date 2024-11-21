import { GetServerSideProps } from 'next';
import React from 'react';
import PostCard from '../../components/Posts/PostCard';
import Layout from '../../components/Layout';
import { Post } from '../../app/types/Post';
import { fetchPostById } from '../../utils/fetchPostById';

interface PostDetailsPageProps {
  post: Post;
}

const PostDetailsPage: React.FC<PostDetailsPageProps> = ({ post }) => {

    const handleVote = (type: "like" | "dislike") => {
        const voteValue = type === "like" ? 1 : -1;
        // Implement your voting logic using voteValue
    };

    const handleComment = (comment: string) => {
        // Implement your commenting logic here
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <PostCard 
                    post={post} 
                    onVote={handleVote} 
                    onComment={handleComment} 
                />
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const post = await fetchPostById(Number(id));

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default PostDetailsPage; 