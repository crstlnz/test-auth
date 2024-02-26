import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      profile (profile: GithubProfile) {
        console.log(profile)
        return {
          ...profile,
          username: profile.login,
          role: 'seller',
          id: profile.id.toString(),
          email: profile.email,
          image: profile.avatar_url
        }
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      console.log('define jwt token: ', token)
      console.log('define jwt user:', user)

      if (user) {
        token.role = user.role
        token.username = user.username
      }

      console.log('return token:', token)

      return token
    },
    async session ({ session, token }) {
      console.log('session : ', session)
      console.log('Token : ', token)
      if (session?.user) {
        session.user.role = token.role
        session.user.username = token.username
      }
      console.log('return session', session)
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
