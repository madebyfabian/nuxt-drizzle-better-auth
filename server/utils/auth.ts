import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink } from 'better-auth/plugins'
import { db } from './db'
import { sendEmail } from './sendEmail'

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		sendResetPassword: async ({ user, url }) => {
			await sendEmail({
				to: user.email,
				subject: 'Reset your password',
				html: `
					<p>Hi ${user.name},</p>
					<p>Click the link below to reset your password:</p>
					<p><a href="${url}">${url}</a></p>
				`,
			})
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			await sendEmail({
				to: user.email,
				subject: 'Verify your email address',
				html: `
					<p>Hi ${user.name},</p>
					<p>Click the link below to verify your email address:</p>
					<p><a href="${url}">${url}</a></p>
				`,
			})
		},
	},
	user: {
		changeEmail: {
			enabled: true,
			sendChangeEmailVerification: async ({ user, newEmail, url }) => {
				await sendEmail({
					to: newEmail,
					subject: 'Verify your email change',
					html: `
						<p>Hi ${user.name},</p>
						<p>Click the link below to verify your email change:</p>
						<p><a href="${url}">${url}</a></p>
						<p>If you didn't request this change, you can ignore this email.</p>
					`,
				})
			},
		},
		deleteUser: {
			enabled: true,
			sendDeleteAccountVerification: async ({ user, url }) => {
				await sendEmail({
					to: user.email,
					subject: 'Verify your account deletion',
					html: `
						<p>Hi ${user.name},</p>
						<p>Click the link below to verify your account deletion:</p>
						<p><a href="${url}">${url}</a></p>
						<p>If you didn't request this deletion, you can ignore this email.</p>
					`,
				})
			},
		},
	},
	plugins: [
		magicLink({
			disableSignUp: true,
			sendMagicLink: async ({ email, url }) => {
				await sendEmail({
					to: email,
					subject: 'Your magic link',
					html: `
						<p>Hi there!</p>
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
