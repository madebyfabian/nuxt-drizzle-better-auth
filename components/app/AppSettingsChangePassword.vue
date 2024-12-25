<template>
	<UCard>
		<h2>Change password</h2>

		<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="Current password" name="currentPassword">
				<UInput
					v-model="state.currentPassword"
					type="password"
					autocomplete="current-password"
				/>
			</UFormField>

			<UFormField label="New password" name="newPassword">
				<UInput
					v-model="state.newPassword"
					type="password"
					autocomplete="new-password"
				/>
			</UFormField>

			<UButton type="submit">Submit</UButton>
		</UForm>
	</UCard>
</template>

<script setup lang="ts">
	import * as z from 'zod'
	import type { FormSubmitEvent } from '#ui/types'

	const { changePassword } = useAuthClient()

	const schema = z.object({
		currentPassword: z.string(),
		newPassword: z.string(),
	})

	type Schema = z.output<typeof schema>

	const state = reactive<Partial<Schema>>({
		currentPassword: undefined,
		newPassword: undefined,
	})

	const pending = ref(false)

	const toast = useToast()
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		await changePassword(
			{
				currentPassword: event.data.currentPassword,
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
						description: 'Your password was successfully updated!',
						color: 'success',
					})

					state.currentPassword = undefined
					state.newPassword = undefined
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
