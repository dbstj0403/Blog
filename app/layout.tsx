// app/layout.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* SessionProvider로 감싸야 useSession, signIn, signOut 등 동작 */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
