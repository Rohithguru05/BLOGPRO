import Link from 'next/link';
import Layout from '../components/Layout';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    </Layout>
  );
}