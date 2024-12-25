<template>
	<UCard>
		<h2>Change email</h2>

		<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="Existing email" name="existingEmail">
				<UInput :value="user?.email" disabled />
			</UFormField>

			<UFormField label="New email" name="newEmail">
				<UInput v-model="state.newEmail" />
			</UFormField>

			<UButton type="submit">Submit</UButton>
		</UForm>
	</UCard>
</template>

<script setup lang="ts">
	import * as z from 'zod'
	import type { FormSubmitEvent } from '#ui/types'

	const { changeEmail } = useAuthClient()
	const { user } = await useAuthUser()

	const schema = z.object({
		newEmail: z.string().email('Invalid email'),
	})

	type Schema = z.output<typeof schema>

	const state = reactive<Partial<Schema>>({
		newEmail: undefined,
	})

	const pending = ref(false)

	const toast = useToast()
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		await changeEmail(
			{
				newEmail: event.data.newEmail,
				callbackURL: '/app/settings',
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
							'The email change verification has been sent! Click on the link to verify your new email address',
						duration: 0,
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
</script>
