// src/components/SearchAndTags.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { getBlogs } from '../lib/storage';
import styles from './SearchAndTags.module.css';

export default function SearchAndTags() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.search || '');
  const [activeTags, setActiveTags] = useState(
    router.query.tag ? [router.query.tag] : []
  );

  useEffect(() => {
    if (router.query.search) {
      setSearchTerm(router.query.search);
    }
    if (router.query.tag) {
      setActiveTags([router.query.tag]);
    }
  }, [router.query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = {};
    if (searchTerm) query.search = searchTerm;
    if (activeTags.length) query.tag = activeTags[0];
    router.push({
      pathname: '/',
      query,
    });
  };

  const handleTagClick = (tag) => {
    const newActiveTags = activeTags.includes(tag) 
      ? activeTags.filter(t => t !== tag)
      : [tag];
    setActiveTags(newActiveTags);
    
    const query = { ...router.query };
    if (newActiveTags.length) {
      query.tag = newActiveTags[0];
    } else {
      delete query.tag;
    }
    router.push({
      pathname: '/',
      query,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveTags([]);
    router.push('/');
  };

  // Extract all unique tags from blogs
  const allTags = Array.from(
    new Set(
      getBlogs()
        .flatMap(blog => blog.tags || [])
        .filter(tag => tag)
    )
  );

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchInputContainer}>
          <div className={styles.searchIcon}>
            <FiSearch />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            placeholder="Search blogs..."
          />
          {(searchTerm || activeTags.length > 0) && (
            <button
              type="button"
              onClick={clearFilters}
              className={styles.clearButton}
            >
              <FiX />
            </button>
          )}
          <button
            type="submit"
            className={styles.searchButton}
          >
            Search
          </button>
        </div>
      </form>

      {allTags.length > 0 && (
        <div className={styles.tagsContainer}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`${styles.tag} ${activeTags.includes(tag) ? styles.activeTag : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}