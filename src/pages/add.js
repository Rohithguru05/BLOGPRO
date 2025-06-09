import { protectRoute } from '../lib/auth';
import Layout from '../components/Layout';
import BlogForm from '../components/BlogForm';
import TiptapEditor from '@/components/TiptapEditor';
export default function AddBlog() {
  return (
    <Layout>
      <BlogForm />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return protectRoute(context);
}