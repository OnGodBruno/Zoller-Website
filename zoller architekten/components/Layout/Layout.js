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
              <Link href={`/projects/${name}`} className={styles.navLink}>
                {formatCategoryTitle(name)}
              </Link>
              {projects && projects.length > 0 && (
                <ul className={styles.subMenu}>
                  {projects.map(projectSlug => (
                    <li key={projectSlug} className={styles.subMenuItem}>
                      <Link
                        href={`/projects/${name}/${projectSlug}`}
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

/** Helper to format category names */
function formatCategoryTitle(category) {
  return category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

/** Helper to format 'sample-project' => 'Sample Project' */
function formatProjectTitle(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}
