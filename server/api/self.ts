import { auth } from '@/server/utils/auth'

/**
 * This does not serve any purpose and is just an example of how you would implement server side auth check.
 */
export default defineEventHandler(async event => {
	const session = await auth.api.getSession({
		headers: event.headers,
	})
	if (!session?.user) {
		throw createError({
			statusCode: 401,
		})
	}

	return {
		user: session.user,
	}
})
