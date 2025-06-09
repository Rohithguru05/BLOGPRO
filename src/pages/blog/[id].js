import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getBlogById } from '../../lib/storage';
import { format, parseISO } from 'date-fns';
import { FiArrowLeft } from 'react-icons/fi';
import styles from '../../styles/BlogDetail.module.css';

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      const foundBlog = getBlogById(id);
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        router.push('/404');
      }
    }
  }, [id, router]);

  if (!blog) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <button
          onClick={() => router.back()}
          className={styles.backButton}
        >
          <FiArrowLeft /> Back to blogs
        </button>
        
        <article className={styles.blogContent}>
          <header className={styles.header}>
            <h1 className={styles.title}>{blog.title}</h1>
            
            <div className={styles.meta}>
              <span className={styles.author}>By {blog.author?.name || 'Anonymous'}</span>
              <span className={styles.divider}>•</span>
              <time dateTime={blog.date}>
                {format(parseISO(blog.date), 'MMMM dd, yyyy')}
              </time>
            </div>
            
            {blog.featured && (
              <span className={styles.featuredBadge}>Featured</span>
            )}
          </header>

          {blog.tags?.length > 0 && (
            <div className={styles.tags}>
              {blog.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    </Layout>
  );
}