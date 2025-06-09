import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FiMail, FiLock, FiLogIn, FiArrowRight } from 'react-icons/fi';
import Layout from '../components/Layout';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState('login');

  return (
    <Layout hideHeader>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>Welcome to NextBlog Pro</h1>
            <p>Share your stories with the world</p>
          </div>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <FiMail className={styles.icon} />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <FiLock className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.primaryButton}>
              <FiLogIn className={styles.buttonIcon} />
              Sign In
              <FiArrowRight className={styles.arrowIcon} />
            </button>
          </form>

          <div className={styles.divider}>
            <span>or continue with</span>
          </div>

          <button 
            onClick={() => signIn('google')}
            className={styles.googleButton}
          >
            <img src="/google-icon.svg" alt="Google" className={styles.googleIcon} />
            Google
          </button>

          <div className={styles.footer}>
            {authType === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => setAuthType('register')}
                  className={styles.linkButton}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => setAuthType('login')}
                  className={styles.linkButton}
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}