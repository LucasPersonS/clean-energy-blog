import Image from "next/image";
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-dark-primary text-white">
        <h1 className="text-4xl font-bold mb-4">404: Page Not Found</h1>
        <h2 className="text-xl mb-6">O recurso que você está tentando acessar não está disponível.</h2>
        <Image 
          src="/404.jpg" 
          alt="Página de Erro" 
          width={400} 
          height={200} 
          layout="responsive"
          className="rounded-lg shadow-lg"
        />
      </div>
    </Layout>
  );
}