import type { Metadata, Viewport } from 'next';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import './globals.css';
import MainLayoutWrapper from './MainLayoutWrapper';
import ModalProvider from '@/context/modal-provider';
import CapacitorBridge from '@/lib/capacitor/CapacitorBridge';


export const metadata: Metadata = {
  title: 'JONAH JEWELS | Jewellery E-commerce App',
  description: 'Premium Jewellery Store, your one-stop shop for everything',
  manifest: "/manifest.json",
  themeColor: "#E8A83E",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Jonah Jewels",
  },
};

// viewportFit: 'cover' lets the WebView draw edge-to-edge (behind the phone's
// status bar / notch) while exposing env(safe-area-inset-*) so our fixed
// header and page content can pad themselves clear of it instead of being
// hidden underneath it.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
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



