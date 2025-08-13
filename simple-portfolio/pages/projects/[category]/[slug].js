import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { useState } from 'react';
import Lightbox, { useLightboxState } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function ProjectPage({ project, navData }) {
  if (!project) {
    return <div>No project data found.</div>;
  }

  const { title, slug, description, location, details, images, plans } =
    project;

  // Combine gallery images (gallery images first, then structural plans)
  const galleryImages = [...images, ...plans];
  // Transform gallery images into slides for the Lightbox
  const gallerySlides = galleryImages.map((img) => ({ src: img }));

  // State to control the Lightbox modal
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title || slug}</title>
        <meta name="description" content="Zoller Architekten Projects" />
      </Head>

      {/* NAV BAR with top and bottom lines only */}
      <header className="navbar">
        <div className="logo">
          <a href="/" className="logo-link">Zoller Architekten</a>
        </div>
        <nav className="nav-links">
          <ul className="nav-list">
            {navData.map(({ category, projects }) => (
              <li key={category} className="nav-item">
                <div className="nav-category">{category}</div>
                {/* Submenu for each project */}
                <ul className="submenu">
                  {projects.map((pSlug) => (
                    <li key={pSlug}>
                      <a
                        href={`/projects/${category}/${pSlug}`}
                        className="submenu-link"
                      >
                        {formatSlug(pSlug)}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* CONTENT */}
      <div className="content-container">
        {/* LEFT COLUMN */}
        <div className="left-column">
          <h1 className="project-title">{title || slug}</h1>
          {description && <p className="project-text">{description}</p>}
          {location && (
            <p className="project-text">
              <strong>Location:</strong> {location}
            </p>
          )}
          {/* Removed misc */}
          {details && (
            <div className="project-text">
              <strong>Details:</strong>
              <br />
              {details.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          )}

          {/* Structural Plans */}
          {plans.length > 0 && (
            <section className="plans-section">
              <h2 className="section-heading">Plan</h2>
              <div className="image-grid">
                {plans.map((planPath, idx) => (
                  <div
                    key={idx}
                    className="image-container"
                    onClick={() => {
                      // Adjust index: plans start after gallery images
                      setPhotoIndex(images.length + idx);
                      setIsOpen(true);
                    }}
                  >
                    <img
                      src={planPath}
                      alt={`Plan ${idx + 1}`}
                      className="project-image"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: Gallery */}
        {images.length > 0 && (
          <div className="right-column">
            <section className="images-section">
              <div className="image-grid">
                {images.map((imgPath, idx) => (
                  <div
                    key={idx}
                    className="image-container"
                    onClick={() => {
                      setPhotoIndex(idx);
                      setIsOpen(true);
                    }}
                  >
                    <img
                      src={imgPath}
                      alt={`Image ${idx + 1}`}
                      className="project-image"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={gallerySlides}
          index={photoIndex}
          onIndexChange={setPhotoIndex}
          render={{
            slideFooter: () => {
              const { currentIndex } = useLightboxState();
              return (
                <div className="custom-lightbox-counter">
                  {currentIndex + 1} / {gallerySlides.length}
                </div>
              );
            }
          }}
        />
      )}

      <style jsx>{`
        :global(body) {
          margin: 0;
          padding: 0;
          background: #f2f2f2;
          color: #333;
          line-height: 1.6;
          font-family: "Georgia", serif;
        }

        /* NAV BAR */
        .navbar {
          display: flex;
          align-items: center;
          justify-content: center; /* Center everything horizontally */
          padding: 0 40px;
          height: 60px;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          background-color: transparent;
          gap: 40px; /* Add spacing between logo and nav */
        }

        .logo {
          font-family: "Helvetica Neue", Arial, sans-serif;
          text-transform: uppercase;
          font-size: 1.75rem;
          font-weight: bold;
          margin-right: 50px;
        }

        .logo-link {
          text-decoration: none;
          color: inherit;
        }

        .nav-links {
          position: relative;
        }

        .nav-list {
          display: flex;
          gap: 50px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
          font-family: "Helvetica Neue", Arial, sans-serif;
          text-transform: uppercase;
        }

        .nav-category {
          cursor: pointer;
          font-weight: 600;
        }

        .submenu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          display: none;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          list-style: none;
          margin: 0;
          padding: 10px 0;
          border: 1px solid #e0e0e0;
          min-width: 180px;
          z-index: 1002;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s cubic-bezier(.4,0,.2,1), transform 0.2s cubic-bezier(.4,0,.2,1);
          max-height: 60vh;
          overflow-y: auto;
          max-width: 90vw;
          box-sizing: border-box;
        }

        .nav-item:hover .submenu,
        .nav-item:focus-within .submenu {
          display: block;
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .submenu li {
          margin: 0;
          padding: 0;
        }

        .submenu-link {
          display: block;
          padding: 10px 22px;
          text-decoration: none;
          color: #222;
          font-size: 1rem;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          transition: background 0.18s, color 0.18s;
        }

        .submenu-link:hover, .submenu-link:focus {
          background: #000;
          color: #f2f2f2;
        }

        /* CONTENT */
        .content-container {
          display: flex;
          flex-wrap: wrap;
          padding: 40px;
          max-width: 40%;
          margin: 0 auto;
        }

        .left-column {
          flex: 1 1 300px;
          max-width: 40%;
          margin-right: 20px;
        }

        .right-column {
          flex: 1 1 200px;
          max-width: 60%;
        }

        .project-title {
          font-size: 2.5rem;
          margin: 0 0 1rem;
          line-height: 1.2;
          font-weight: lighter;
        }


        .section-heading {
          font-size: 1.5rem;
          margin: 2rem 0 1rem;
          font-weight: lighter;
        }

        .project-text {
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          grid-auto-flow: dense;
          gap: 15px;
        }

        .image-container:nth-child(3n) {
          grid-column: span 2;
          grid-row: span 2;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(70%);
          transition: filter 0.3s ease;
        }

        .image-container:hover .project-image {
          filter: none;
        }

        .custom-lightbox-counter {
          position: fixed;
          bottom: 32px;
          left: 0;
          right: 0;
          text-align: center;
          color: #222;
          font-size: 1.2rem;
          z-index: 9999;
          pointer-events: none;
          font-family: inherit;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: center;
            padding: 0 10px;
            height: auto;
            gap: 10px;
            border-top: none; /* Remove top border on mobile */
          }
          .logo {
            margin-right: 0;
            font-size: 1.2rem;
            margin-bottom: 8px;
          }
          .nav-list {
            gap: 10px;
            flex-direction: column;
            align-items: center;
          }
          .nav-item {
            width: 100%;
            text-align: center;
          }
          .submenu {
            left: 50%;
            min-width: 140px;
            max-width: 95vw;
            font-size: 0.95rem;
            padding: 6px 0;
          }
          .submenu-link {
            padding: 8px 10px;
            font-size: 0.95rem;
          }
          .content-container {
            flex-direction: column;
            padding: 10px;
            max-width: 100%;
          }
          .left-column,
          .right-column {
            max-width: 100%;
            margin-right: 0;
          }
          .left-column {
            margin-bottom: 20px;
          }
          .image-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
          }
          .image-container:nth-child(3n) {
            grid-column: span 1;
            grid-row: span 1;
          }
          .image-container {
            min-height: 90px;
            border-radius: 6px;
            box-shadow: 0 1px 6px rgba(0,0,0,0.08);
            aspect-ratio: 1 / 1;
            /* Make all images square on mobile */
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .project-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            aspect-ratio: 1 / 1;
            /* Ensure image fills the square */
          }
          .project-title {
            font-size: 1.5rem;
          }
          .section-heading {
            font-size: 1.1rem;
          }
          .project-text {
            font-size: 0.98rem;
          }
        }
      `}</style>
      <style jsx global>{`
        .yarl__counter {
          display: block !important;
          color: #222 !important;
          font-size: 1.2rem !important;
          z-index: 9999 !important;
        }
      `}</style>
    </>
  );
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

  let paths = [];
  for (const category of categories) {
    const catDir = path.join(baseDir, category);
    const slugFolders = fs
      .readdirSync(catDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    slugFolders.forEach((slug) => {
      paths.push({ params: { category, slug } });
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { category, slug } = params;
  const baseDir = path.join(process.cwd(), 'public', 'projects');
  const projectDir = path.join(baseDir, category, slug);

  if (!fs.existsSync(projectDir)) {
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

  // Helper: read text with BOM removal and robust UTF-8 handling
  const readTxt = (fileName) => {
    const filePath = path.join(projectDir, fileName);
    if (!fs.existsSync(filePath)) return null;
    // Read as buffer and decode as UTF-8 to ensure correct umlaut handling
    let content = fs.readFileSync(filePath);
    // Remove BOM if present
    if (content[0] === 0xef && content[1] === 0xbb && content[2] === 0xbf) {
      content = content.slice(3);
    }
    // Decode buffer as UTF-8
    return content.toString('utf8').trim() || null;
  };

  const title = readTxt('title.txt') || slug;
  const description = readTxt('description.txt');
  const location = readTxt('location.txt');
  const details = readTxt('details.txt');

  // normal images
  let images = [];
  const imagesPath = path.join(projectDir, 'images');
  if (fs.existsSync(imagesPath)) {
    images = fs
      .readdirSync(imagesPath, { withFileTypes: true })
      .filter((f) => {
        if (f.isDirectory()) return false;
        const ext = path.extname(f.name).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map((f) => `/projects/${category}/${slug}/images/${f.name}`);
  }

  // structural plans
  let plans = [];
  const plansPath = path.join(projectDir, 'plans');
  if (fs.existsSync(plansPath)) {
    plans = fs
      .readdirSync(plansPath, { withFileTypes: true })
      .filter((f) => {
        if (f.isDirectory()) return false;
        const ext = path.extname(f.name).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map((f) => `/projects/${category}/${slug}/plans/${f.name}`);
  }

  return {
    props: {
      navData,
      project: {
        category,
        slug,
        title,
        description,
        location,
        // Removed misc
        details,
        images,
        plans,
      },
    },
  };
}
