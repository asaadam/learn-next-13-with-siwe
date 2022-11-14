'use client';
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { SiweMessage } from 'siwe';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAuth } from '../lib/next-auth';

export function ButtonLogin() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [connected, setIsConnected] = useState(false);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const handleLogin = async () => {
    try {
      const callbackUrl = '/profile';
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    if (status !== 'loading' && !session && isConnected) {
      handleLogin();
    }
  }, [isConnected, status, session]);

  useEffect(() => {
    console.log(session?.user);
    if (session?.user && isConnected) {
      setIsConnected(true);
    }
  }, [connected, status, session]);

  if (connected) {
    return (
      <button onClick={() => router.push('/profile')}>
        Go to Profile Page
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        if (!isConnected) {
          connect();
        } else {
          handleLogin();
        }
      }}
    >
      Connect Wallet
    </button>
  );
}
