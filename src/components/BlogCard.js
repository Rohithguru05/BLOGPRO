// components/BlogCard.js
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { FiBookmark, FiHeart, FiShare2, FiArrowRight } from 'react-icons/fi';
import styles from './BlogCard.module.css';
import TiptapEditor from '@/components/TiptapEditor';
export default function BlogCard({ blog, darkMode = false, isOwner = false, onDelete }) {
  const safeDate = blog?.date ? parseISO(blog.date) : new Date();
  const formattedDate = format(safeDate, 'MMMM d, yyyy');

  if (!blog) return null;

  return (
    <article className={`${styles.card} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link href={`/blog/${blog.id}`}>
            <h2 className={styles.title}>
              {blog.title || 'Untitled Post'}
              {blog.featured && <span className={styles.featuredBadge}>Featured</span>}
            </h2>
          </Link>
          <div className={styles.meta}>
            <span className={styles.author}>By {blog.author?.name || 'Anonymous'}</span>
            <span className={styles.divider}>•</span>
            <time dateTime={blog.date || ''}>{formattedDate}</time>
            <span className={styles.divider}>•</span>
            <span>{blog.readTime || '3'} min read</span>
          </div>
        </div>

        <p className={styles.excerpt}>
          {blog.content?.substring(0, 200) || 'No content available'}...
        </p>

        {blog.tags?.length > 0 && (
          <div className={styles.tags}>
            {blog.tags.map(tag => (
              <Link 
                key={tag} 
                href={`/?tag=${tag}`}
                className={styles.tag}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <Link href={`/blog/${blog.id}`} className={styles.readMore}>
            Read more
            <FiArrowRight className={styles.icon} />
          </Link>
          
          <div className={styles.actions}>
            {isOwner && (
              <>
                <Link href={`/add?id=${blog.id}`} className={styles.actionButton} title="Edit">
                  Edit
                </Link>
                <button 
                  onClick={() => onDelete(blog.id)} 
                  className={styles.actionButton}
                  title="Delete"
                >
                  Delete
                </button>
              </>
            )}
            <button className={styles.actionIcon} title="Bookmark">
              <FiBookmark />
            </button>
            <button className={styles.actionIcon} title="Like">
              <FiHeart />
            </button>
            <button className={styles.actionIcon} title="Share">
              <FiShare2 />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}