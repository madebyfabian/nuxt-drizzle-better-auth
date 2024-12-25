<template>
	<header class="flex justify-between py-4 mb-8 border-b items-center">
		<div class="tracking-tighter font-semibold font-family-heading">
			Nuxt Better Auth Example
		</div>

		<div v-if="user" class="flex gap-4 items-center">
			<div>
				<p>{{ user.name }}</p>
				<p class="text-sm">{{ user.email }}</p>
			</div>
			<UButton variant="outline" @click="() => handleSignOut()">Logout</UButton>
		</div>
	</header>

	<div>Only for logged in members!</div>
</template>

<script setup lang="ts">
	const toast = useToast()

	const { signOut } = useAuthClient()
	const { user } = await useAuthUser()

	const handleSignOut = async () => {
		await signOut(undefined, {
			onSuccess: () => {
				toast.add({
					title: 'Success',
					description: 'You have successfully signed out!',
				})
				navigateTo('/')
			},
			onError: errorContext => {
				toast.add({
					title: 'Error',
					description: errorContext.error.message,
				})
			},
		})
	}
</script>
