import type { Metadata } from 'next';
import localFont from 'next/font/local'
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import './globals.css';
import MainLayoutWrapper from './MainLayoutWrapper';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JONAH | Jewellery E-commerce App',
  description: 'Your one-stop shop for everything',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <ReduxProvider>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}



