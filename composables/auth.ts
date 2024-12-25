import { createAuthClient } from 'better-auth/vue'

export const useAuthClient = () => {
	return createAuthClient()
}

export const useAuthUser = async () => {
	const authClient = useAuthClient()

	return {
		user: (await authClient.useSession(useFetch)).data.value?.user,
	}
}
