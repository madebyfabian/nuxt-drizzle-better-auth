import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink } from 'better-auth/plugins'
import { db } from './db'
import { sendEmail } from './sendEmail'

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	emailVerification: {
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Verify your email address',
				html: `
					<p>Click the link below to verify your email address:</p>
					<p><a href="${url}">${url}</a></p>
				`,
			})
		},
	},
	plugins: [
		magicLink({
			disableSignUp: true,
			sendMagicLink: async ({ email, url }, request) => {
				await sendEmail({
					to: email,
					subject: 'Your magic link',
					html: `
						<p>Click the link below to sign in:</p>
						<p><a href="${url}">${url}</a></p>
					`,
				})
			},
		}),
	],
	database: drizzleAdapter(db, {
		provider: 'pg',
	}),
})
