// pages/_app.js
import '../styles/globals.css';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  // If categories exist in pageProps, great; otherwise default to []
  const { categories = [] } = pageProps;

  return (
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
