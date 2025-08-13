// components/Layout/Layout.js

import Link from 'next/link';
import styles from './Layout.module.css';

/**
 * @param {object} props
 * @param {Array<{ name: string, projects: string[] }>} props.categories
 * @param {React.ReactNode} props.children
 */
export default function Layout({ categories = [], children }) {
  return (
    <div className={styles.container}>
      {/* Top Navbar */}
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          {categories.map(({ name, projects }) => (
            <li key={name} className={styles.navItem}>
              <span className={styles.navLink}>{name}</span>
              {projects.length > 0 && (
                <ul className={styles.subMenu}>
                  {projects.map(projectSlug => (
                    <li key={projectSlug} className={styles.subMenuItem}>
                      <Link
                        href={`/projects/${projectSlug}`}
                        className={styles.subMenuLink}
                      >
                        {formatProjectTitle(projectSlug)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

/** Helper to format 'sample-project' => 'Sample Project' */
function formatProjectTitle(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}
