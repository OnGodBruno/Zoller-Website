import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function ProjectPage({ project, navData }) {
  // State to control the Lightbox modal - must be declared before any early returns
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!project) {
    return <div>No project data found.</div>;
  }

  const { title, slug, description, location, details, images, plans } =
    project;

  // Combine gallery images (gallery images first, then structural plans)
  const galleryImages = [...images, ...plans];
  // Transform gallery images into slides for the Lightbox
  const gallerySlides = galleryImages.map((img) => ({ src: img }));

  return (
    <>
      <Head>
        <title>{title || slug}</title>
        <meta name="description" content="Zoller Architekten Projects" />
      </Head>

      {/* NAV BAR with top and bottom lines only */}
      <header className="navbar">
        <div className="logo">
          <Link href="/" className="logo-link">Zoller Architekten</Link>
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
            slideFooter: ({ index }) => {
              return (
                <div className="custom-lightbox-counter">
                  {index + 1} / {gallerySlides.length}
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
          background: #ffffff;
          color: #000000;
          line-height: 1.4;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-weight: 300;
        }

        /* NAV BAR - Swiss minimalism */
        .navbar {
          display: flex;
          align-items: center;
          justify-content: center;
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

        /* Add invisible bridge to prevent dropdown from disappearing */
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
          cursor: pointer;
          padding: 8px 0;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease;
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

        /* Custom scrollbar styling */
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

        /* Add subtle top border accent */
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

        /* CONTENT - Better centered layout with smaller gap */
        .content-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          padding: 80px 48px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: start;
        }

        .left-column {
          display: flex;
          flex-direction: column;
          gap: 32px;
          width: 100%;
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 32px;
          width: 100%;
        }

        .project-title {
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 1px;
          line-height: 1.2;
          margin: 0;
          text-transform: uppercase;
        }

        .section-heading {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 24px 0;
          border-bottom: 1px solid #000000;
          padding-bottom: 8px;
        }

        .project-text {
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
          font-weight: 300;
        }

        .project-text strong {
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 8px;
        }

        /* Gallery with properly sized images */
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 4px;
          margin-top: 32px;
          width: 100%;
          max-width: 100%;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1;
          background: #000000;
          transition: transform 0.3s ease;
          min-height: 180px;
        }

        /* Occasional wider images for visual interest */
        .image-container:nth-child(5n+1) {
          grid-column: span 2;
          aspect-ratio: 2/1;
          min-height: 180px;
        }

        .image-container:hover {
          transform: scale(1.01);
          z-index: 10;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }

        .image-container:hover .project-image {
          opacity: 0.95;
        }

        /* Plans section with architectural presentation */
        .plans-section {
          margin-top: 64px;
          padding-top: 32px;
          border-top: 1px solid #e0e0e0;
        }

        .plans-section .image-grid {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 8px;
          margin-top: 24px;
        }

        .plans-section .image-container {
          aspect-ratio: auto;
          background: #000000;
          transition: transform 0.3s ease;
          min-height: 200px;
        }

        .plans-section .image-container:nth-child(4n+1) {
          grid-column: span 1;
          aspect-ratio: auto;
        }

        .plans-section .image-container:hover {
          transform: scale(1.005);
        }

        .custom-lightbox-counter {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          color: #ffffff;
          font-size: 11px;
          font-family: "Helvetica Neue", Arial, sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 9999;
          pointer-events: none;
          background: rgba(0, 0, 0, 0.8);
          padding: 8px 16px;
        }

        @media (max-width: 1024px) {
          .content-container {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 48px 24px;
          }
          
          .navbar {
            padding: 16px 24px;
          }
          
          .logo {
            margin-right: 40px;
          }
          
          .nav-list {
            gap: 16px;
          }

          .image-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 2px;
            max-width: 350px;
          }

          .image-container:nth-child(5n+1) {
            grid-column: span 2;
            aspect-ratio: 2/1;
          }

          .plans-section .image-grid {
            grid-template-columns: 1fr;
            max-width: none;
          }

          .submenu {
            min-width: 250px;
            max-width: 300px;
            max-height: 50vh;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 16px;
            padding: 16px;
          }
          
          .logo {
            margin-right: 0;
            margin-bottom: 8px;
          }
          
          .nav-list {
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
          }

          .submenu {
            left: 50%;
            transform: translateX(-50%) translateY(16px);
            min-width: 220px;
            max-width: 280px;
            max-height: 40vh;
            padding: 16px 0;
          }

          .submenu::before {
            left: 16px;
            right: 16px;
          }

          .submenu li:not(:last-child)::after {
            left: 16px;
            right: 16px;
          }

          .submenu-link {
            padding: 12px 16px;
            font-size: 10px;
          }

          .submenu-link:hover {
            padding-left: 24px;
          }

          .nav-item:hover .submenu {
            transform: translateX(-50%) translateY(8px);
          }
          
          .content-container {
            padding: 32px 16px;
            gap: 32px;
          }
          
          .project-title {
            font-size: 18px;
          }
          
          .image-grid {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 1px;
            max-width: 250px;
          }
          
          .image-container:nth-child(5n+1) {
            grid-column: span 2;
            aspect-ratio: 2/1;
          }

          .image-container:hover {
            transform: scale(1.005);
          }

          .plans-section .image-grid {
            grid-template-columns: 1fr;
            gap: 4px;
            max-width: none;
          }
        }
      `}</style>
      <style jsx global>{`
        /* Completely minimal lightbox - no animations, no effects */
        .yarl__container {
          background: rgba(255, 255, 255, 0.95) !important;
        }

        .yarl__toolbar {
          background: rgba(255, 255, 255, 0.9) !important;
          border: none !important;
          padding: 16px !important;
        }

        .yarl__button {
          background: transparent !important;
          color: #000000 !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          width: 40px !important;
          height: 40px !important;
          transition: none !important;
          margin: 0 4px !important;
          outline: none !important;
        }

        .yarl__button:hover {
          background: transparent !important;
          color: #000000 !important;
          box-shadow: none !important;
          transform: none !important;
          border: none !important;
          outline: none !important;
        }

        .yarl__button:focus {
          background: transparent !important;
          color: #000000 !important;
          box-shadow: none !important;
          transform: none !important;
          border: none !important;
          outline: none !important;
        }

        .yarl__button svg {
          width: 16px !important;
          height: 16px !important;
          stroke: #000000 !important;
          stroke-width: 1.5 !important;
          fill: none !important;
          transition: none !important;
        }

        /* Navigation arrows - completely static, no movement whatsoever */
        .yarl__navigation_prev,
        .yarl__navigation_next {
          background: transparent !important;
          border: none !important;
          border-radius: 0 !important;
          width: 50px !important;
          height: 50px !important;
          transition: none !important;
          box-shadow: none !important;
          outline: none !important;
        }

        .yarl__navigation_prev:hover,
        .yarl__navigation_next:hover {
          background: transparent !important;
          transform: none !important;
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
        }

        .yarl__navigation_prev:focus,
        .yarl__navigation_next:focus {
          background: transparent !important;
          transform: none !important;
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
        }

        .yarl__navigation_prev svg,
        .yarl__navigation_next svg {
          width: 18px !important;
          height: 18px !important;
          stroke: #000000 !important;
          stroke-width: 1.5 !important;
          fill: none !important;
          transition: none !important;
          transform: none !important;
        }

        .yarl__navigation_prev:hover svg,
        .yarl__navigation_next:hover svg {
          transform: none !important;
        }

        /* Static loading spinner */
        .yarl__loading {
          border: 2px solid rgba(0, 0, 0, 0.1) !important;
          border-top: 2px solid #000000 !important;
          border-radius: 50% !important;
          width: 30px !important;
          height: 30px !important;
          animation: yarl-spin 1s linear infinite !important;
        }

        @keyframes yarl-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Simple counter */
        .yarl__counter {
          display: none !important;
        }

        .custom-lightbox-counter {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: #000000;
          font-size: 11px;
          font-family: "Helvetica Neue", Arial, sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 9999;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.9);
          padding: 8px 16px;
        }

        /* Kill all shadows, borders, and movements completely */
        .yarl__button,
        .yarl__button:hover,
        .yarl__button:focus,
        .yarl__button:active,
        .yarl__navigation_prev,
        .yarl__navigation_prev:hover,
        .yarl__navigation_prev:focus,
        .yarl__navigation_prev:active,
        .yarl__navigation_next,
        .yarl__navigation_next:hover,
        .yarl__navigation_next:focus,
        .yarl__navigation_next:active {
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
          background: transparent !important;
          filter: none !important;
          backdrop-filter: none !important;
        }

        /* Nuclear option - override everything in the yarl library */
        .yarl__container * {
          box-shadow: none !important;
          filter: none !important;
          backdrop-filter: none !important;
        }

        .yarl__toolbar {
          box-shadow: none !important;
          border: none !important;
          background: transparent !important;
          backdrop-filter: none !important;
        }

        .yarl__navigation {
          box-shadow: none !important;
          filter: none !important;
        }

        .yarl__slide_image {
          box-shadow: none !important;
          filter: none !important;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .content-container {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 16px;
            max-width: 100%;
          }

          .image-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 2px;
            margin-top: 24px;
          }

          .image-container {
            min-height: 120px;
          }

          .image-container:nth-child(5n+1) {
            grid-column: span 1;
            aspect-ratio: 1;
            min-height: 120px;
          }

          .nav-list {
            flex-direction: column;
            gap: 16px;
          }

          .logo {
            margin-right: 0;
            margin-bottom: 16px;
          }
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
    
    // Read as buffer first
    let content = fs.readFileSync(filePath);
    
    // Remove UTF-8 BOM if present (EF BB BF)
    if (content.length >= 3 && content[0] === 0xef && content[1] === 0xbb && content[2] === 0xbf) {
      content = content.slice(3);
    }
    // Remove UTF-16 LE BOM if present (FF FE)
    else if (content.length >= 2 && content[0] === 0xff && content[1] === 0xfe) {
      content = content.slice(2);
      // Decode as UTF-16 LE
      return content.toString('utf16le').trim().replace(/\0/g, '') || null;
    }
    // Remove UTF-16 BE BOM if present (FE FF)
    else if (content.length >= 2 && content[0] === 0xfe && content[1] === 0xff) {
      content = content.slice(2);
      // Decode as UTF-16 BE
      return content.toString('utf16le').trim().replace(/\0/g, '') || null;
    }
    
    // Try to decode as UTF-8 and clean up any strange characters
    let text = content.toString('utf8').trim();
    
    // Remove the diamond question mark characters and fix spacing
    text = text.replace(/^\uFFFD+/, ''); // Remove replacement characters at the start
    text = text.replace(/\uFFFD/g, ''); // Remove all replacement characters
    text = text.replace(/^[��\u00EF\u00BB\u00BF]+/, ''); // Remove visible BOM chars
    text = text.replace(/\s+/g, ' '); // Normalize spacing
    
    return text.trim() || null;
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
