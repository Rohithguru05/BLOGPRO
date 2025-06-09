import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="title" content="NextBlog Pro - Modern Blogging Platform" />
        <meta
          name="description"
          content="A fully responsive blog platform with markdown support, Google authentication, and local storage."
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Fonts - Using Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        
        {/* PWA */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="application-name" content="NextBlog Pro" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextblog-pro.vercel.app/" />
        <meta property="og:title" content="NextBlog Pro - Modern Blogging Platform" />
        <meta
          property="og:description"
          content="A fully responsive blog platform with markdown support, Google authentication, and local storage."
        />
        <meta property="og:image" content="/social-banner.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nextblog-pro.vercel.app/" />
        <meta property="twitter:title" content="NextBlog Pro - Modern Blogging Platform" />
        <meta
          property="twitter:description"
          content="A fully responsive blog platform with markdown support, Google authentication, and local storage."
        />
        <meta property="twitter:image" content="/social-banner.png" />
      </Head>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Main />
        <NextScript />
        
        {/* Optional analytics script */}
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src="https://analytics.example.com/script.js"
            data-website-id="YOUR_ANALYTICS_ID"
          />
        )}
      </body>
    </Html>
  );
}