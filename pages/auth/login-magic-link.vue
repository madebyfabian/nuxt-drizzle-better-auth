<template>
	<div>
		<h1>Login</h1>

		<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="Email" name="email">
				<UInput v-model="state.email" />
			</UFormField>

			<UButton type="submit">Submit</UButton>
		</UForm>

		<div class="mt-4">or</div>

		<div class="flex mt-4">
			<UButton to="/auth/login" color="neutral" variant="outline">
				Login with password
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
	import * as z from 'zod'
	import type { FormSubmitEvent } from '#ui/types'

	const { signIn } = useAuthClient()

	const schema = z.object({
		email: z.string().email('Invalid email'),
	})

	type Schema = z.output<typeof schema>

	const state = reactive<Partial<Schema>>({
		email: undefined,
	})

	const pending = ref(false)

	const toast = useToast()
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		await signIn.magicLink(
			{
				email: event.data.email,
				callbackURL: '/app',
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
						description: 'The magic link has been sent! You can close this tab',
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
