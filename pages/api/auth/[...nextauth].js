import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.googleClientId}`,
      clientSecret: `${process.env.googleSecret}`,
    }),
  ],
  adapter: FirestoreAdapter({
    apiKey: `${process.env.apiKey}`,
    authDomain: `${process.env.authDomain}`,
    projectId: `${process.env.projectId}`,
    storageBucket: `${process.env.storageBucket}`,
    messagingSenderId: `${process.env.messagingSenderId}`,
    appId: `${process.env.appId}`,
  }),
  callbacks: {
    async session({ session, user }) {
      session.user.tag = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase();

      session.user.uid = user.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
