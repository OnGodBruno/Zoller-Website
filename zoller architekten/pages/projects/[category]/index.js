// pages/projects/[category]/index.js
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function CategoryOverview({ category, projects, navData }) {
  return (
    <>
      <Head>
        <title>{formatCategory(category)} - Zoller Architekten</title>
        <meta name="description" content={`${formatCategory(category)} projects by Zoller Architekten`} />
      </Head>
      
      <header className="navbar">
        <div className="logo">
          <Link href="/" className="logo-link">
            Zoller Architekten
          </Link>
        </div>
        <nav className="nav-links">
          <ul className="nav-list">
            {navData.map(({ category: cat, projects }) => (
              <li key={cat} className="nav-item">
                <Link href={`/projects/${cat}`} className="nav-category">
                  {cat}
                </Link>
                <ul className="submenu">
                  {projects.map((pSlug) => (
                    <li key={pSlug}>
                      <Link
                        href={`/projects/${cat}/${pSlug}`}
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

      <main className="category-main">
        <div className="category-header">
          <h1 className="category-title">{formatCategory(category)}</h1>
        </div>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <Link 
              key={project.slug} 
              href={`/projects/${category}/${project.slug}`}
              className="project-card"
            >
              <div className="project-image">
                {project.firstImage && (
                  <img 
                    src={project.firstImage} 
                    alt={project.title}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
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

        .category-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 48px;
        }

        .category-header {
          margin-bottom: 80px;
          text-align: center;
        }

        .category-title {
          font-size: 32px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 200;
          letter-spacing: 3px;
          line-height: 1.1;
          margin: 0;
          text-transform: uppercase;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 48px;
        }

        .project-card {
          display: block;
          text-decoration: none;
          color: #000000;
          transition: transform 0.2s ease;
        }

        .project-card:hover {
          transform: translateY(-2px);
        }

        .project-image {
          width: 100%;
          height: 300px;
          background: #f8f8f8;
          overflow: hidden;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.02);
        }

        .project-info {
          text-align: center;
        }

        .project-title {
          font-size: 14px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0;
          line-height: 1.3;
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

          .category-main {
            padding: 48px 24px;
          }

          .category-header {
            margin-bottom: 48px;
          }

          .category-title {
            font-size: 24px;
            letter-spacing: 2px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .project-image {
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

export async function getStaticPaths() {
  const baseDir = path.join(process.cwd(), 'public', 'projects');
  if (!fs.existsSync(baseDir)) {
    return { paths: [], fallback: false };
  }

  const categories = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const paths = categories.map((category) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { category } = params;
  const baseDir = path.join(process.cwd(), 'public', 'projects');
  const categoryDir = path.join(baseDir, category);

  if (!fs.existsSync(categoryDir)) {
    return { notFound: true };
  }

  // Build navData
  let navData = [];
  if (fs.existsSync(baseDir)) {
    const catFolders = fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const cat of catFolders) {
      const subDir = path.join(baseDir, cat);
      const subProjects = fs
        .readdirSync(subDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

      navData.push({
        category: cat,
        projects: subProjects,
      });
    }
  }

  // Get projects for this category
  const projectSlugs = fs
    .readdirSync(categoryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const projects = [];
  for (const slug of projectSlugs) {
    const projectDir = path.join(categoryDir, slug);
    
    // Read title
    const titlePath = path.join(projectDir, 'title.txt');
    let title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    if (fs.existsSync(titlePath)) {
      try {
        let content = fs.readFileSync(titlePath);
        
        // Remove UTF-8 BOM if present
        if (content.length >= 3 && content[0] === 0xef && content[1] === 0xbb && content[2] === 0xbf) {
          content = content.slice(3);
        }
        // Handle UTF-16 encoding
        else if (content.length >= 2 && content[0] === 0xff && content[1] === 0xfe) {
          content = content.slice(2);
          title = content.toString('utf16le').trim().replace(/\0/g, '');
        }
        else if (content.length >= 2 && content[0] === 0xfe && content[1] === 0xff) {
          content = content.slice(2);
          title = content.toString('utf16le').trim().replace(/\0/g, '');
        }
        
        if (!title || title.includes('�')) {
          let text = content.toString('utf8').trim();
          text = text.replace(/^\uFFFD+/, '');
          text = text.replace(/\uFFFD/g, '');
          text = text.replace(/^[��\u00EF\u00BB\u00BF]+/, '');
          title = text.trim() || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        }
      } catch (err) {
        console.error(`Error reading title for ${slug}:`, err);
      }
    }

    // Get first image
    let firstImage = null;
    const imagesPath = path.join(projectDir, 'images');
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
        firstImage = `/projects/${category}/${slug}/images/${imageFiles[0]}`;
      }
    }

    projects.push({
      slug,
      title,
      firstImage,
    });
  }

  return {
    props: {
      category,
      projects,
      navData,
    },
  };
}
