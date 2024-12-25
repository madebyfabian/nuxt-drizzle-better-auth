<template>
	<UModal title="Delete account?" v-model:open="isOpen">
		<UButton label="Delete account" color="error" variant="subtle" />

		<template #body>
			<p>Are you sure you want to delete your account?</p>
			<p>
				We send you a verification email in which you can click to confirm your
				account deletion.
			</p>

			<UButton @click="handleDeleteAccount" block color="error" class="mt-6">
				Send verification email
			</UButton>
		</template>
	</UModal>
</template>

<script setup lang="ts">
	const isOpen = ref(false)
	const pending = ref(false)

	const toast = useToast()
	const { deleteUser } = useAuthClient()

	const handleDeleteAccount = async () => {
		await deleteUser(
			{
				callbackURL: '/goodbye',
			},
			{
				onRequest: () => {
					pending.value = true
				},
				onResponse: () => {
					pending.value = false
				},
				onSuccess: () => {
					toast.add({
						title: 'Success',
						description:
							'The verification email has been sent! Click on the link to verify your account deletion',
						color: 'success',
					})
					isOpen.value = false
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
</script>
