// pages/index.js
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';

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
        .navbar {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 40px;
          height: 60px;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          background-color: transparent;
          gap: 40px;
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
        .landing-main {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(120deg, #f2f2f2 0%, #e0e0e0 100%);
        }
        .landing-hero {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .landing-title {
          font-size: 3rem;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: bold;
          letter-spacing: 0.04em;
          margin-bottom: 0.5rem;
        }
        .landing-subtitle {
          font-size: 1.3rem;
          color: #444;
          font-family: 'Georgia', serif;
        }
        .landing-description {
          text-align: left;
          margin-top: 2rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          padding: 1.5rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          white-space: pre-wrap; /* Preserve line breaks */
        }
        .landing-paragraph {
          font-size: 1.5rem;
          color: #555;
          margin-bottom: 1.5rem;
          font-family: 'Georgia', serif;
          line-height: 1.8;
        }
        .landing-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }
        .landing-btn {
          background: #222;
          color: #fff;
          padding: 0.9rem 2.2rem;
          border-radius: 0;
          font-size: 1.1rem;
          text-decoration: none;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 600;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          transition: background 0.18s, color 0.18s, box-shadow 0.18s;
        }
        .landing-btn:hover, .landing-btn:focus {
          background: #000;
          color: #fff;
          box-shadow: 0 4px 18px rgba(0,0,0,0.13);
        }
        @media (max-width: 600px) {
          .landing-title {
            font-size: 2rem;
          }
          .landing-subtitle {
            font-size: 1rem;
          }
          .landing-btn {
            font-size: 1rem;
            padding: 0.7rem 1.5rem;
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
    landingParagraph = fs.readFileSync(paragraphFilePath, 'utf-8');
  }

  console.log('Landing Paragraph:', landingParagraph);

  return {
    props: { navData, landingParagraph },
  };
}
