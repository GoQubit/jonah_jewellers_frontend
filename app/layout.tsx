import type { Metadata } from 'next';
import localFont from 'next/font/local'
import { Inter } from 'next/font/google';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import './globals.css';
import MainLayoutWrapper from './MainLayoutWrapper';
import ModalProvider from '@/context/modal-provider';
import CapacitorBridge from '@/lib/capacitor/CapacitorBridge';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JONAH JEWELS | Jewellery E-commerce App',
  description: 'Your one-stop shop for everything',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter?.className} `}>
        <CapacitorBridge />
        <ReduxProvider>
          <ModalProvider>
            <MainLayoutWrapper>
              {children}
            </MainLayoutWrapper>
          </ModalProvider>
        </ReduxProvider>
      </body>
    </html >
  );
}



