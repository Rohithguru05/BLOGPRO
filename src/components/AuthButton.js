// src/components/AuthButton.js
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import styles from './AuthButton.module.css';

export default function AuthButton({ darkMode }) {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <div className={styles.authContainer}>
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User avatar'}
            width={32}
            height={32}
            className={styles.userAvatar}
            unoptimized={true}
          />
        )}
        <span className={styles.userName}>{session.user.name}</span>
        <button
          onClick={() => signOut()}
          className={styles.authButton}
        >
          <FiLogOut className={styles.authIcon} /> Sign out
        </button>
      </div>
    );
  }
  
  return (
    <button
      onClick={() => signIn('google')}
      className={styles.authButton}
    >
      <FiLogIn className={styles.authIcon} /> Sign in
    </button>
  );
}