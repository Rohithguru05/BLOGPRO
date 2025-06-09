'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { saveBlog, getBlogById } from '../lib/storage';
import styles from './BlogForm.module.css';
import { FiEdit2, FiEye, FiType, FiTag, FiStar, FiSend, FiHelpCircle } from 'react-icons/fi';
import TiptapEditor from '@/components/TiptapEditor';

export default function BlogForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [preview, setPreview] = useState(false);
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    tags: '',
    featured: false
  });

  useEffect(() => {
    if (router.query.id) {
      const data = getBlogById(router.query.id);
      if (data) setBlog({ ...data, tags: data.tags?.join(', ') || '' });
    }
  }, [router.query.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = blog.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
      
      await saveBlog({
        ...blog,
        tags: tagsArray,
        author: {
          id: session?.user?.email,
          name: session?.user?.name,
          image: session?.user?.image
        },
        date: new Date().toISOString()
      });

      router.push('/');
    } catch (error) {
      console.error('Failed to save blog:', error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <FiEdit2 className={styles.headerIcon} />
          {router.query.id ? 'Edit Story' : 'Create New Story'}
        </h1>
        <button 
          onClick={() => setPreview(!preview)}
          className={styles.previewToggle}
        >
          {preview ? <><FiEdit2 /> Edit Mode</> : <><FiEye /> Preview Mode</>}
        </button>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FiType className={styles.icon} />
            Title
          </label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            placeholder="Your amazing title..."
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FiTag className={styles.icon} />
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={blog.tags}
              onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
              placeholder="technology, design, business"
              className={styles.input}
            />
            <p className={styles.hintText}>Separate tags with commas</p>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={blog.featured}
              onChange={(e) => setBlog({ ...blog, featured: e.target.checked })}
              className={styles.checkbox}
            />
            <label htmlFor="featured" className={styles.checkboxLabel}>
              <FiStar className={styles.icon} />
              Featured Story
            </label>
          </div>
        </div>

        <div className={styles.editorContainer}>
          <div className={styles.editorHeader}>
            <h3 className={styles.editorTitle}>Content</h3>
            <div className={styles.editorHelp}>
              <FiHelpCircle />
              <span>Supports rich text formatting</span>
            </div>
          </div>
          
          {preview ? (
            <div
              className={styles.previewContent}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <div className={styles.editorWrapper}>
              <TiptapEditor
                content={blog.content}
                onChange={(content) => setBlog({ ...blog, content })}
              />
              <div className={styles.editorPlaceholder}>
                {!blog.content && (
                  <p>Start writing your story here... Use the toolbar above for formatting</p>
                )}
              </div>
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          <FiSend className={styles.buttonIcon} />
          Publish Story
        </button>
      </form>
    </div>
  );
}