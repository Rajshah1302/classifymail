'use client'
import { useSession, signIn, signOut } from 'next-auth/react';

function Component() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          <p>Not signed in</p>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </>
      ) : (
        <>
          <p>Signed in as {session.user.email}</p>
          <p>Access Token: {session.accessToken}</p>
          <p>ID Token: {session.idToken}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}

export default Component;