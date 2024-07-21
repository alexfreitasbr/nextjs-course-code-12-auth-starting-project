import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'


export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider(
            {
                async authorize(credentials, req) {
                    
                    const client = await connectToDatabase()

                    const usersCollection = client.db().collection('users')

                    const user = await usersCollection.findOne({ email: credentials.email })
                    
                    if (!user) {
                        client.close()
                        throw new Error('No user found for credentials')
                    }

                    const isValid = await verifyPassword(credentials.password, user.password)
                    
                    if (!isValid) {
                        client.close()
                        throw new Error('Invalid password')
                    }

                    client.close()

                    return { email: user.email }
                }
            }
        )
    ]
})