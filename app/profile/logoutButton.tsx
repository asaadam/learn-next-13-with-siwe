'use client';

import { signOut } from 'next-auth/react';
import { useDisconnect } from 'wagmi';

export function LogoutButton() {
  const { disconnect } = useDisconnect();

  return (
    <button>
      <a
        href={`/api/auth/signout`}
        onClick={(e) => {
          e.preventDefault();
          disconnect();
          signOut({
            callbackUrl: '/',
          });
        }}
      >
        logout
      </a>
    </button>
  );
}
