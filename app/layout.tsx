import React from 'react';
import './globals.css';
import Header from '@/components/common/Header';
import Providers from './providers';

export const metadata = {
  title: 'Digital Hanaro Tech Blog',
  description: 'Digital Hanaro Tech Blog 💚',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css'
        />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
