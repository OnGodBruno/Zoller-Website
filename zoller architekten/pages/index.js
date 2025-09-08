// pages/index.js
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';

export default function Home({ navData, landingParagraph }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenCategory(null); // Close any open category when toggling main menu
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenCategory(null);
  };

  return (
    <>
      <Head>
        <title>Zoller Architekten</title>
        <meta name="description" content="Zoller Architekten Portfolio" />
      </Head>
      <header className="navbar">
        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
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

        /* Mobile Navigation */
        <nav className="mobile-nav">
          <div className="mobile-nav-header">
            <span className="mobile-logo">ZOLLER ARCHITEKTEN</span>
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
            </button>
          </div>
          
          <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-menu-backdrop" onClick={closeMobileMenu}></div>
            <div className="mobile-menu-content">
              <ul className="mobile-nav-list">
                {navData.map(({ category, projects }) => (
                  <li key={category} className="mobile-nav-item">
                    <button 
                      className="mobile-nav-category"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                      <span className={`category-arrow ${openCategory === category ? 'open' : ''}`}>→</span>
                    </button>
                    <ul className={`mobile-submenu ${openCategory === category ? 'open' : ''}`}>
                      {projects.map((pSlug) => (
                        <li key={pSlug}>
                          <a
                            href={`/projects/${category}/${pSlug}`}
                            className="mobile-submenu-link"
                            onClick={closeMobileMenu}
                          >
                            {pSlug.replace(/-/g, ' ')}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

        /* Desktop Navigation */
        .desktop-nav {
          display: block;
        }

        .mobile-nav {
          display: none;
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

        /* Mobile Navigation Styles */
        .mobile-nav {
          width: 100%;
        }

        .mobile-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .mobile-logo {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 14px;
          font-weight: 200;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #000000;
        }

        .mobile-menu-toggle {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 24px;
          height: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1003;
        }

        .hamburger-line {
          width: 24px;
          height: 2px;
          background: #000000;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger-line.active:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger-line.active:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.active:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 1002;
          overflow: hidden;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .mobile-menu-content {
          position: relative;
          width: 80%;
          max-width: 320px;
          height: 100%;
          background: #ffffff;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
          padding-top: 80px;
          z-index: 2;
        }

        /* Backdrop for mobile menu */
        .mobile-menu::before {
          content: '';
          position: fixed;
          top: 0;
          left: 100%;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .mobile-menu.open::before {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-nav-item {
          border-bottom: 1px solid #f0f0f0;
        }

        .mobile-nav-category {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 20px 24px;
          background: none;
          border: none;
          font-family: "Helvetica Neue", Arial, sans-serif;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
          font-weight: 400;
          color: #000000;
          cursor: pointer;
          text-align: left;
        }

        .mobile-nav-category:hover {
          background: #f8f8f8;
        }

        .category-arrow {
          font-size: 16px;
          transition: transform 0.3s ease;
          font-weight: 300;
        }

        .category-arrow.open {
          transform: rotate(90deg);
        }

        .mobile-submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: #f8f8f8;
        }

        .mobile-submenu.open {
          max-height: 500px;
        }

        .mobile-submenu-link {
          display: block;
          padding: 16px 40px;
          text-decoration: none;
          color: #666666;
          font-size: 11px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 300;
          border-bottom: 1px solid #e8e8e8;
          transition: all 0.2s ease;
        }

        .mobile-submenu-link:hover {
          color: #000000;
          background: #efefef;
          padding-left: 48px;
        }

        .mobile-submenu li:last-child .mobile-submenu-link {
          border-bottom: none;
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

        @media (max-width: 900px) {
          /* Hide desktop navigation and show mobile navigation */
          .desktop-nav {
            display: none !important;
          }

          .mobile-nav {
            display: block !important;
          }

          .navbar {
            justify-content: center;
            padding: 16px 24px;
          }

          .mobile-nav {
            width: 100%;
            max-width: none;
          }
        }

        @media (max-width: 768px) {
          
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

        @media (max-width: 480px) {
          .navbar {
            padding: 12px 16px;
          }

          .mobile-logo {
            font-size: 12px;
            letter-spacing: 1.5px;
          }

          .mobile-menu-content {
            width: 85%;
            max-width: 280px;
          }

          .mobile-nav-category {
            padding: 18px 16px;
            font-size: 11px;
          }

          .mobile-submenu-link {
            padding: 14px 32px;
            font-size: 10px;
          }

          .mobile-submenu-link:hover {
            padding-left: 40px;
          }

          .landing-main {
            padding: 32px 12px 24px;
            gap: 24px;
          }

          .landing-title {
            font-size: 20px;
            letter-spacing: 1.5px;
          }

          .landing-description {
            padding: 24px 16px;
          }

          .landing-paragraph {
            font-size: 12px;
            line-height: 1.6;
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
