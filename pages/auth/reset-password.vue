<template>
	<div>
		<h1>Reset password</h1>

		<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="New Password" name="newPassword">
				<UInput
					v-model="state.newPassword"
					type="password"
					autocomplete="new-password"
				/>
			</UFormField>

			<UButton type="submit">Submit</UButton>
		</UForm>
	</div>
</template>

<script setup lang="ts">
	import * as z from 'zod'
	import type { FormSubmitEvent } from '#ui/types'

	const { resetPassword } = useAuthClient()

	const schema = z.object({
		newPassword: z.string(),
	})

	type Schema = z.output<typeof schema>

	const state = reactive<Partial<Schema>>({
		newPassword: undefined,
	})

	const pending = ref(false)

	const toast = useToast()
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		await resetPassword(
			{
				newPassword: event.data.newPassword,
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
						description: 'Your password was successfully changed.',
						color: 'success',
					})
					navigateTo('/app')
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
