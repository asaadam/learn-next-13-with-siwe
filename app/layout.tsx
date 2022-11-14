import AuthProvider from './authProvider';
import WagmiProvider from './wagmiProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <WagmiProvider>
          <body>{children}</body>
        </WagmiProvider>
      </AuthProvider>
    </html>
  );
}
