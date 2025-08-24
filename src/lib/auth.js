// src/lib/auth.js - Update the credentials provider
CredentialsProvider({
  name: 'credentials',
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    try {
      const usersCollection = await dbConnect(collectionNameObj.usersCollection);
      
      // Find user by email (case-insensitive)
      const user = await usersCollection.findOne({ 
        email: { $regex: new RegExp(`^${credentials.email}$`, 'i') } 
      });

      if (!user) {
        console.log('No user found with email:', credentials.email);
        return null;
      }

      console.log('Found user:', user.email);
      console.log('Stored password hash:', user.password);
      
      // Check if password exists and is a valid hash
      if (!user.password || !user.password.startsWith('$2b$')) {
        console.log('Invalid password hash format');
        return null;
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
      
      console.log('Password comparison result:', isPasswordValid);
      
      if (!isPasswordValid) {
        console.log('Invalid password for user:', user.email);
        return null;
      }

      // Return user data that will be stored in the session
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        image: user.image || null,
      };
    } catch (error) {
      console.error('Auth error:', error);
      return null;
    }
  }
})