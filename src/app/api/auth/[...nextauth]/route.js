import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const scopes=[
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.modify",
//   "https://www.googleapis.com/auth/gmail.metadata"
]

const handler =  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/gmail.readonly openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      console.log(session.accessToken);
      return session;
    },
  },
});

// const handler = NextAuth(authOptions);
module.exports = { GET: handler, POST: handler };