import { ConnectKitButton } from 'connectkit';
import { Session } from 'next-auth';
import { cookies, headers } from 'next/headers';
import { getCsrfToken, isAuth } from '../lib/next-auth';
import { unstable_getServerSession } from 'next-auth/next';
import dynamic from 'next/dynamic';
import { ButtonLogin } from './buttonConnect';
// const ButtonLogin = dynamic(
//   () => import('./buttonConnect').then((button) => button.ButtonLogin),
//   {
//     ssr: false,
//   }
// );

export default async function Page() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <ButtonLogin />
    </div>
  );
}
