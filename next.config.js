/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiKey: 'AIzaSyBcorKIUIPKZSpRFS2C1hIDkALfQzMvQyw',
    authDomain: 'ushare-4edff.firebaseapp.com',
    projectId: 'ushare-4edff',
    storageBucket: 'ushare-4edff.appspot.com',
    messagingSenderId: '220878634095',
    appId: '1:220878634095:web:3a49ba672d59bdd94ce19a',
  },
};

module.exports = nextConfig;
