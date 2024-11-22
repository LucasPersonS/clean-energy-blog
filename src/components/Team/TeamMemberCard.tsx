import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface TeamMember {
  name: string;
  rm: string;
  avatarUrl?: string;
  githubUrl: string;
  linkedinUrl: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="bg-dark-secondary p-6 rounded-lg shadow-lg flex flex-col items-center">
      <img
        src={member.avatarUrl || '/avatars/default-avatar.png'}
        alt={`${member.name} Avatar`}
        className="w-24 h-24 rounded-full mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-white">{member.name}</h3>
      <p className="text-sm text-gray-400">RM: {member.rm}</p>
      <div className="flex space-x-4 mt-4">
        <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
          <FaGithub size={24} />
        </a>
        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  );
};

export default TeamMemberCard;