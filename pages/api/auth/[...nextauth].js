import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.googleClientId,
      clientSecret: process.env.googleSecret,
    }),
  ],
  adapter: FirestoreAdapter({
    apiKey: 'AIzaSyBcorKIUIPKZSpRFS2C1hIDkALfQzMvQyw',
    authDomain: ' ushare-4edff.firebaseapp.com',
    projectId: 'ushare-4edff',
    storageBucket: 'ushare-4edff.appspot.com',
    messagingSenderId: '220878634095',
    appId: '1:220878634095:web:3a49ba672d59bdd94ce19a',
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
