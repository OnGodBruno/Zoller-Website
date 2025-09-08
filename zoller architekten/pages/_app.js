// pages/_app.js
import '../styles/globals.css';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  // Transform navData to categories format expected by Layout
  const { navData = [] } = pageProps;
  const categories = navData.map(({ category, projects }) => ({
    name: category,
    projects: projects || []
  }));

  return (
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
