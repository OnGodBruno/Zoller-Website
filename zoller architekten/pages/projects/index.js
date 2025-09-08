// pages/projects/index.js
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function ProjectsOverview({ categories, navData }) {
  return (
    <>
      <Head>
        <title>Projects - Zoller Architekten</title>
        <meta name="description" content="All projects by Zoller Architekten" />
      </Head>
      
      <header className="navbar">
        <div className="logo">
          <Link href="/" className="logo-link">
            Zoller Architekten
          </Link>
        </div>
        <nav className="nav-links">
          <ul className="nav-list">
            {navData.map(({ category, projects }) => (
              <li key={category} className="nav-item">
                <Link href={`/projects/${category}`} className="nav-category">
                  {category}
                </Link>
                <ul className="submenu">
                  {projects.map((pSlug) => (
                    <li key={pSlug}>
                      <Link
                        href={`/projects/${category}/${pSlug}`}
                        className="submenu-link"
                      >
                        {formatSlug(pSlug)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="projects-main">
        <div className="projects-header">
          <h1 className="projects-title">Projects</h1>
        </div>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={`/projects/${category.name}`}
              className="category-card"
            >
              <div className="category-image">
                {category.firstImage && (
                  <img 
                    src={category.firstImage} 
                    alt={category.name}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="category-info">
                <h3 className="category-title">{formatCategory(category.name)}</h3>
                <p className="category-count">{category.projectCount} Projects</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <style jsx>{`
        :global(body) {
          margin: 0;
          padding: 0;
          background: #ffffff;
          color: #000000;
          line-height: 1.4;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-weight: 300;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px;
          height: auto;
          border-bottom: 1px solid #000000;
          background-color: #ffffff;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          font-family: "Helvetica Neue", Arial, sans-serif;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 2px;
          margin-right: 80px;
        }

        .logo-link {
          text-decoration: none;
          color: #000000;
        }

        .nav-links {
          position: relative;
        }

        .nav-list {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
          font-family: "Helvetica Neue", Arial, sans-serif;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 1px;
          font-weight: 400;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 16px;
          background: transparent;
          z-index: 1001;
        }

        .nav-category {
          display: block;
          cursor: pointer;
          padding: 8px 0;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease;
          text-decoration: none;
          color: #000000;
        }

        .nav-category:hover {
          border-bottom-color: #000000;
        }

        .submenu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(16px);
          display: none;
          background: #ffffff;
          list-style: none;
          margin: 0;
          padding: 24px 0;
          border: none;
          min-width: 280px;
          max-width: 400px;
          max-height: 60vh;
          overflow-y: auto;
          z-index: 1002;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .submenu::-webkit-scrollbar {
          width: 3px;
        }

        .submenu::-webkit-scrollbar-track {
          background: transparent;
        }

        .submenu::-webkit-scrollbar-thumb {
          background: #000000;
          border-radius: 0;
        }

        .submenu::-webkit-scrollbar-thumb:hover {
          background: #333333;
        }

        .submenu::before {
          content: '';
          position: absolute;
          top: 0;
          left: 24px;
          right: 24px;
          height: 2px;
          background: #000000;
        }

        .nav-item:hover .submenu {
          display: block;
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(8px);
        }

        .submenu li {
          margin: 0;
          padding: 0;
          position: relative;
        }

        .submenu li:not(:last-child)::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 24px;
          right: 24px;
          height: 1px;
          background: #f0f0f0;
        }

        .submenu-link {
          display: block;
          padding: 16px 24px;
          text-decoration: none;
          color: #666666;
          font-size: 11px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          transition: all 0.3s ease;
          position: relative;
          font-weight: 300;
        }

        .submenu-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 1px;
          background: #000000;
          transition: width 0.3s ease;
        }

        .submenu-link:hover {
          color: #000000;
          padding-left: 32px;
          font-weight: 400;
        }

        .submenu-link:hover::before {
          width: 16px;
        }

        .projects-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 48px;
        }

        .projects-header {
          margin-bottom: 80px;
          text-align: center;
        }

        .projects-title {
          font-size: 32px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 200;
          letter-spacing: 3px;
          line-height: 1.1;
          margin: 0;
          text-transform: uppercase;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 48px;
        }

        .category-card {
          display: block;
          text-decoration: none;
          color: #000000;
          transition: transform 0.2s ease;
        }

        .category-card:hover {
          transform: translateY(-2px);
        }

        .category-image {
          width: 100%;
          height: 300px;
          background: #f8f8f8;
          overflow: hidden;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .category-card:hover .category-image img {
          transform: scale(1.02);
        }

        .category-info {
          text-align: center;
        }

        .category-title {
          font-size: 16px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .category-count {
          font-size: 12px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 300;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0;
          color: #666666;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 16px 24px;
          }

          .logo {
            font-size: 12px;
            margin-right: 40px;
          }

          .nav-list {
            gap: 16px;
          }

          .projects-main {
            padding: 48px 24px;
          }

          .projects-header {
            margin-bottom: 48px;
          }

          .projects-title {
            font-size: 24px;
            letter-spacing: 2px;
          }

          .categories-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .category-image {
            height: 250px;
          }
        }
      `}</style>
    </>
  );
}

function formatCategory(category) {
  return category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatSlug(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function getStaticProps() {
  const baseDir = path.join(process.cwd(), 'public', 'projects');
  
  if (!fs.existsSync(baseDir)) {
    return {
      props: {
        categories: [],
        navData: [],
      },
    };
  }

  const categoryFolders = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  // Build navData
  const navData = [];
  const categories = [];

  for (const categoryName of categoryFolders) {
    const categoryDir = path.join(baseDir, categoryName);
    const projectSlugs = fs
      .readdirSync(categoryDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    navData.push({
      category: categoryName,
      projects: projectSlugs,
    });

    // Get first image from first project for category thumbnail
    let firstImage = null;
    if (projectSlugs.length > 0) {
      const firstProjectDir = path.join(categoryDir, projectSlugs[0]);
      const imagesPath = path.join(firstProjectDir, 'images');
      
      if (fs.existsSync(imagesPath)) {
        const imageFiles = fs
          .readdirSync(imagesPath, { withFileTypes: true })
          .filter((f) => {
            if (f.isDirectory()) return false;
            const ext = path.extname(f.name).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
          })
          .map((f) => f.name);

        if (imageFiles.length > 0) {
          firstImage = `/projects/${categoryName}/${projectSlugs[0]}/images/${imageFiles[0]}`;
        }
      }
    }

    categories.push({
      name: categoryName,
      projectCount: projectSlugs.length,
      firstImage,
    });
  }

  return {
    props: {
      categories,
      navData,
    },
  };
}
