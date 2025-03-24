import { getSession } from 'next-auth/react';

export const getAuth = async () => {
  const session = await getSession();
  if (session) {
    return {
      token: session?.accessToken,
      user: session?.user,
    };
  }
  return null;
};
