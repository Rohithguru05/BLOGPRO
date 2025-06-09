// components/Layout.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(savedTheme ? savedTheme === 'dark' : systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }
  }, [darkMode, mounted]);

  if (!mounted) {
    return (
      <div>
        <Head>
          <title>NextBlog Pro</title>
          <meta name="description" content="Modern blogging platform" />
        </Head>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>NextBlog Pro</title>
        <meta name="description" content="Modern blogging platform" />
      </Head>
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1>Share Your Thoughts</h1>
          <p>A modern platform for writers and readers</p>
        </div>
      </div>
      
      <main className={styles.mainContent}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          © {new Date().getFullYear()} NextBlog Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}