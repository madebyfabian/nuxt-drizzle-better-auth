import nodemailer from 'nodemailer'

export const sendEmail = async ({
	to,
	subject,
	html,
}: {
	to: string
	subject: string
	html: string
}) => {
	const transporter = nodemailer.createTransport({
		url: process.env.NODEMAILER_URL,
	})

	await transporter.sendMail({
		from: '"Nuxt Better Auth" <beer.fabian@mail.de>',
		to,
		subject,
		html,
	})
}
