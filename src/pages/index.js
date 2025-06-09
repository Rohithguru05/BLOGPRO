// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../lib/storage';
import styles from '../styles/Home.module.css';

const SearchAndTags = dynamic(
  () => import('../components/SearchAndTags'),
  { ssr: false }
);

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBlogs(getBlogs());
  }, []);

  if (!mounted) return null;

  return (
    <Layout>
      <Head>
        <title>Latest Blog Posts | NextBlog Pro</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              Latest <span style={{ color: 'var(--color-primary)' }}>Blog</span> Posts
            </h1>
            <p className={styles.subtitle}>
              Discover insightful articles on trending topics
            </p>
          </div>

          <SearchAndTags />

          <div className={styles.grid}>
            {blogs.length > 0 ? (
              blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No blogs found. Create the first one!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}