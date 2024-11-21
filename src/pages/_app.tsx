// src/pages/_app.tsx
import '../app/globals.css';
import type { AppProps } from 'next/app';
import { PostProvider } from '../context/PostContext';
import { AuthProvider } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PostProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </PostProvider>
    </AuthProvider>
  );
}

export default MyApp;