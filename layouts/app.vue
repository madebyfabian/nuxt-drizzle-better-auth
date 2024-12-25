<template>
	<div class="container mb-8">
		<UAlert
			v-if="!user?.emailVerified"
			color="error"
			class="my-4"
			:actions="[
				{
					label: 'Resend verification email',
					color: 'neutral',
					variant: 'soft',
					onClick: () => handleSendVerificationEmail(),
				},
			]"
		>
			<template #title>
				<p>Please verify your email address</p>
			</template>
		</UAlert>

		<header class="flex justify-between py-4 mb-8 border-b items-center">
			<NuxtLink
				to="/app"
				class="tracking-tighter font-semibold text-xl font-family-heading"
			>
				Nuxt Better Auth Example
			</NuxtLink>

			<div v-if="user" class="flex gap-4 items-center">
				<div class="mr-4">
					<p class="text-sm">Hi, {{ user.name }} 👋</p>
					<p class="text-xs">{{ user.email }}</p>
				</div>

				<UButton color="neutral" variant="outline" to="/app/settings">
					Settings
				</UButton>

				<UButton
					color="neutral"
					variant="outline"
					@click="() => handleSignOut()"
				>
					Logout
				</UButton>
			</div>
		</header>

		<slot />
	</div>
</template>

<script setup lang="ts">
	const toast = useToast()
	const { signOut, sendVerificationEmail } = useAuthClient()

	const { user } = await useAuthUser()

	const handleSendVerificationEmail = async () => {
		if (!user) {
			throw createError({
				statusCode: 401,
			})
		}
		await sendVerificationEmail(
			{
				email: user.email,
				callbackURL: '/app',
			},
			{
				onSuccess: () => {
					toast.add({
						title: 'Success',
						description: 'The verification email has been sent!',
						color: 'success',
					})
				},
				onError: errorContext => {
					toast.add({
						title: 'Error',
						description: errorContext.error.message,
						color: 'error',
					})
				},
			}
		)
	}

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
