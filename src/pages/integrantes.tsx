import React from 'react';
import Layout from '../components/Layout';
import TeamMemberCard from '../components/Team/TeamMemberCard';
import { FaHandshake } from 'react-icons/fa';


const integrantes = [
  {
    name: 'Lucas Person Servollo',
    rm: 'RM559186',
    avatarUrl: '/lucas.png',
    githubUrl: 'https://github.com/LucasPersonS',
    linkedinUrl: 'https://linkedin.com/in/lservollo',
  },
  {
    name: 'Vinicius Ribeiro Nery',
    rm: 'RM559165',
    avatarUrl: '/vinicius.jpg',
    githubUrl: 'https://github.com/ViniciusRibeiroNery',
    linkedinUrl: 'https://linkedin.com/in/viniciusribeironery',
  },
  {
    name: 'Joao Pedro Sanson',
    rm: 'RM556802',
    avatarUrl: '/joao.jpg',
    githubUrl: 'https://github.com/JoaoPedroSanson',
    linkedinUrl: 'https://linkedin.com/in/joaopedrosanson',
  },
];

const IntegrantesPage: React.FC = () => {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Nossa Equipe</h1>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrantes.map((member) => (
              <TeamMemberCard key={member.rm} member={member} />
            ))}
          </div>
          <div className="mt-16 bg-dark-primary p-8 rounded-lg shadow-lg text-center justify-center">
            <h2 className="text-3xl font-bold mb-4">Os DEVs</h2>
            <p className="text-lg mb-6 text-center justify-center">
              Nós somos apaixonados por energia limpa e sustentabilidade. Conecte-se conosco nas redes sociais para se manter atualizado sobre nossos últimos projetos e iniciativas.
            </p>
            <div className="flex justify-center">
            <button
              onClick={() => window.open('https://linkedin.com', '_blank')}
              className="bg-lime-500 text-dark-primary px-6 py-3 rounded-full font-semibold hover:bg-lime-600 transition-colors flex items-center justify-center space-x-2"
            >
              <FaHandshake size={20} />
              <span className="text-dark-primary font-semibold text-align-center justify-center">Conecte-se conosco</span>
            </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default IntegrantesPage;