// lib/storage.js
const STORAGE_KEY = 'nextblog_blogs';

export function getBlogs() {
  if (typeof window === 'undefined') return [];
  try {
    const blogs = localStorage.getItem(STORAGE_KEY);
    return blogs ? JSON.parse(blogs) : [];
  } catch (error) {
    console.error('Error reading blogs from storage:', error);
    return [];
  }
}

export function getBlogById(id) {
  const blogs = getBlogs();
  return blogs.find(blog => blog.id === id);
}

export function getBlogsByAuthor(authorId) {
  const blogs = getBlogs();
  return blogs.filter(blog => blog.author?.id === authorId);
}

export function saveBlog(blogData) {
  try {
    const blogs = getBlogs();
    let updatedBlogs;
    
    if (blogData.id) {
      // Update existing blog
      updatedBlogs = blogs.map(blog => 
        blog.id === blogData.id ? blogData : blog
      );
    } else {
      // Create new blog
      blogData.id = Date.now().toString();
      updatedBlogs = [blogData, ...blogs];
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
    return blogData;
  } catch (error) {
    console.error('Error saving blog:', error);
    throw error;
  }
}

export function deleteBlog(id) {
  try {
    const blogs = getBlogs().filter(blog => blog.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}