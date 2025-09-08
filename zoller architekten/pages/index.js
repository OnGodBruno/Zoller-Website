// pages/index.js
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

export default function Home({ navData, landingParagraph }) {
  return (
    <>
      <Head>
        <title>Zoller Architekten</title>
        <meta name="description" content="Zoller Architekten Portfolio" />
      </Head>
      <header className="navbar">
        <nav className="nav-links">
          <ul className="nav-list">
            {navData.map(({ category, projects }) => (
              <li key={category} className="nav-item">
                <div className="nav-category">{category}</div>
                <ul className="submenu">
                  {projects.map((pSlug) => (
                    <li key={pSlug}>
                      <a
                        href={`/projects/${category}/${pSlug}`}
                        className="submenu-link"
                      >
                        {pSlug.replace(/-/g, ' ')}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="landing-main">
        <div className="landing-hero">
          <h1 className="landing-title">ZOLLER ARCHITEKTEN</h1>
        </div>
        <div className="landing-description">
          <p className="landing-paragraph">
            {landingParagraph}
          </p>
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
          justify-content: center;
          padding: 24px 48px;
          height: auto;
          border-bottom: 1px solid #000000;
          background-color: #ffffff;
          position: sticky;
          top: 0;
          z-index: 1000;
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

        .landing-main {
          min-height: calc(100vh - 80px);
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          padding: 120px 48px 80px;
          max-width: 1400px;
          margin: 0 auto;
          align-items: start;
        }

        .landing-hero {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .landing-title {
          font-size: 32px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 200;
          letter-spacing: 3px;
          line-height: 1.1;
          margin: 0;
          text-transform: uppercase;
        }

        .landing-description {
          background: #ffffff;
          border: 1px solid #e0e0e0;
          padding: 48px;
        }

        .landing-paragraph {
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
          white-space: pre-line;
        }

        @media (max-width: 1024px) {
          .landing-main {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 80px 24px 48px;
          }
          
          .navbar {
            padding: 16px 24px;
          }
          
          .nav-list {
            gap: 16px;
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
          
          .landing-main {
            padding: 48px 16px 32px;
            gap: 32px;
          }
          
          .landing-title {
            font-size: 24px;
            letter-spacing: 2px;
          }
          
          .landing-description {
            padding: 32px 24px;
          }
          
          .landing-paragraph {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  const paragraphFilePath = path.join(process.cwd(), 'public', 'landing-paragraph.txt');
  let navData = [];
  let landingParagraph = '';

  if (fs.existsSync(projectsDir)) {
    const categories = fs
      .readdirSync(projectsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    navData = categories.map(category => {
      const categoryDir = path.join(projectsDir, category);
      const projects = fs
        .readdirSync(categoryDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      return { category, projects };
    });
  }

  if (fs.existsSync(paragraphFilePath)) {
    // Read as buffer first to handle encoding properly
    let content = fs.readFileSync(paragraphFilePath);
    
    // Remove UTF-8 BOM if present (EF BB BF)
    if (content.length >= 3 && content[0] === 0xef && content[1] === 0xbb && content[2] === 0xbf) {
      content = content.slice(3);
    }
    // Remove UTF-16 LE BOM if present (FF FE)
    else if (content.length >= 2 && content[0] === 0xff && content[1] === 0xfe) {
      content = content.slice(2);
      landingParagraph = content.toString('utf16le').trim().replace(/\0/g, '');
    }
    // Remove UTF-16 BE BOM if present (FE FF)
    else if (content.length >= 2 && content[0] === 0xfe && content[1] === 0xff) {
      content = content.slice(2);
      landingParagraph = content.toString('utf16le').trim().replace(/\0/g, '');
    }
    
    if (!landingParagraph) {
      // Try to decode as UTF-8 and clean up any strange characters
      let text = content.toString('utf8').trim();
      
      // Remove the diamond question mark characters and fix spacing
      text = text.replace(/^\uFFFD+/, ''); // Remove replacement characters at the start
      text = text.replace(/\uFFFD/g, ''); // Remove all replacement characters
      text = text.replace(/^[��\u00EF\u00BB\u00BF]+/, ''); // Remove visible BOM chars
      text = text.replace(/\s+/g, ' '); // Normalize spacing
      
      landingParagraph = text.trim();
    }
  }

  console.log('Landing Paragraph:', landingParagraph);

  return {
    props: { navData, landingParagraph },
  };
}
