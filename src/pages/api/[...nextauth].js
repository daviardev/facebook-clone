import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.PUBLIC_NEXT_CLIENTID,
      clientSecret: process.env.PUBLIC_NEXT_CLIENTSECRET
    })
  ],
  callbacks: {
    async session ({ session, token }) {
      session.user.tag = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase()

      session.user.uid = token.sub
      return session
    }
  },
  secret: process.env.NEXT_PUBLIC_AUTHSECRET
}

export default NextAuth(authOptions)
