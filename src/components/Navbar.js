// src/components/Navbar.js
import Link from 'next/link';
import { FiHome, FiEdit, FiBook, FiUser } from 'react-icons/fi';
import AuthButton from './AuthButton';
import DarkModeToggle from './DarkModeToggle';
import styles from './Navbar.module.css';

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.logo}>
          NextBlog Pro
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            <FiHome className={styles.navIcon} /> Home
          </Link>
          
          <Link href="/add" className={styles.navLink}>
            <FiEdit className={styles.navIcon} /> Create
          </Link>
          
          <Link href="/my-blogs" className={styles.navLink}>
            <FiBook className={styles.navIcon} /> My Blogs
          </Link>
        </div>
        
        <div className={styles.navControls}>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <AuthButton darkMode={darkMode} />
        </div>
      </div>
    </nav>
  );
}