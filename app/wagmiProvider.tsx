'use client';

import { configureChains, chain, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);
export default function WagmiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
