// pages/myblogs.js
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BlogCard from '../components/BlogCard';
import { getBlogsByAuthor, deleteBlog } from '../lib/storage';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

export default function MyBlogs() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      setBlogs(getBlogsByAuthor(session.user.email));
    }
  }, [session]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Blogs</h1>
          <Link
            href="/add"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <FiPlus /> New Blog
          </Link>
        </div>
        
        {blogs.length === 0 ? (
          <div className="text-center py-12 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-gray-500 mb-4">You have not created any blogs yet.</p>
            <Link
              href="/add"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <FiPlus /> Create Your First Blog
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.map(blog => (
              <BlogCard
                key={blog.id}
                blog={blog}
                isOwner={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}