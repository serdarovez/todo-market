import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'O-Complex Test App',
  description: 'React Developer Test Task',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
