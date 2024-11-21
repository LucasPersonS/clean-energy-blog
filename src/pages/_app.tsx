// src/pages/_app.tsx
import '../app/globals.css';
import type { AppProps } from 'next/app';
import { PostProvider } from '../context/PostContext';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </PostProvider>
  );
}

export default MyApp;