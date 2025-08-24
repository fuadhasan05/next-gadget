import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// Create the NextAuth options object
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log('Auth attempt with:', credentials?.email);
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          const usersCollection = await dbConnect(collectionNameObj.usersCollection);
          
          if (!usersCollection) {
            console.error('Database connection failed');
            return null;
          }

          const user = await usersCollection.findOne({ 
            email: { $regex: new RegExp(`^${credentials.email}$`, 'i') } 
          });

          if (!user) {
            console.log('No user found with email:', credentials.email);
            return null;
          }

          console.log('User found:', user.email);
          
          if (!user.password || !user.password.startsWith('$2')) {
            console.log('Invalid password hash format');
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          console.log('Password comparison result:', isPasswordValid);
          
          if (!isPasswordValid) {
            console.log('Invalid password for user:', user.email);
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email,
            image: user.image || null,
          };
          
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error", 
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/";
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
};

// Export the handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };