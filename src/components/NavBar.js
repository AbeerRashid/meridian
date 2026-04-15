"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';  // tells us what page we're on
import styles from './navbar.module.css';

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      {pathname === '/' ? (
        <span className={styles.brand}>Meridian</span> // Title now brings back to main convert page
      ) : (
        <Link href='/' className={styles.brand}>
          Meridian
        </Link>
      )}
      <div className={styles.links}>
        <Link href='/' className={pathname === '/' ? styles.active : ''}>
          Converter
        </Link>
        <Link href='/watchlist' className={pathname === '/watchlist' ? styles.active : ''}>
          Watch List
        </Link>
        <Link href='/themes' className={pathname === '/themes' ? styles.active : ''}>
          Themes
        </Link>
      </div>
    </nav>
  );
}
