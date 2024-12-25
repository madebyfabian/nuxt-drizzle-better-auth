import { createAuthClient } from 'better-auth/vue'
import { magicLinkClient } from 'better-auth/client/plugins'

export const useAuthClient = () => {
	return createAuthClient({
		plugins: [magicLinkClient()],
	})
}

export const useAuthUser = async () => {
	const authClient = useAuthClient()

	return {
		user: (await authClient.useSession(useFetch)).data.value?.user,
	}
}
