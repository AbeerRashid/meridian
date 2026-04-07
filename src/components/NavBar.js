"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';  // tells us what page we're on
import styles from './navbar.module.css';

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      <span className={styles.brand}>Meridian</span>
      <div className={styles.links}>
        <Link href='/' className={pathname === '/' ? styles.active : ''}>
          Converter
        </Link>
        <Link href='/watchlist' className={pathname === '/watchlist' ? styles.active : ''}>
          Watchlist
        </Link>
        <Link href='/themes' className={pathname === '/themes' ? styles.active : ''}>
          Themes
        </Link>
      </div>
    </nav>
  );
}
