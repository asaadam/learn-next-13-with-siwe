import { unstable_getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { getSessionData } from '../../lib/next-auth';
import { LogoutButton } from './logoutButton';

export default async function Page() {
  const session = await unstable_getServerSession();
  const session2 = await getSessionData();

  if (!session2) {
    redirect('/');
  }

  return (
    <div>
      <h1>From getserverSession nextjs</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1>Custom getSession</h1>
      <pre>{JSON.stringify(session2, null, 2)}</pre>

      <LogoutButton />
    </div>
  );
}
