import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Create NextAuth handler
const handler = NextAuth({
  // Configure authentication providers
  providers: [
    // Use GoogleProvider for authentication
    GoogleProvider({
      // Use environment variables for client ID and client secret
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // Specify additional authorization parameters
      authorization: {
        params: {
          // Define the scope of access required for Google API
          scope: 'https://mail.google.com/ openid email profile',
        },
      },
    }),
  ],
  // Configure callback functions for JWT and session
  callbacks: {
    // Callback function for handling JWT
    async jwt({ token, account }) {
      // Persist the OAuth access token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    // Callback function for handling session
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      console.log(session.accessToken);
      return session;
    },
  },
});

// Export NextAuth handler for both GET and POST requests
module.exports = { GET: handler, POST: handler };
