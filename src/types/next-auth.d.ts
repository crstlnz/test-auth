import { DefaultUser, DefaultSession } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      role: string
      username: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    username: string
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string
    username: string
  }
}
