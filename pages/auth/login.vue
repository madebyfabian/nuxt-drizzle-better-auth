<template>
	<div>
		<h1>Login</h1>

		<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="Email" name="email">
				<UInput v-model="state.email" />
			</UFormField>

			<UFormField label="Password" name="password">
				<UInput v-model="state.password" type="password" />
			</UFormField>

			<UButton type="submit">Submit</UButton>
		</UForm>
	</div>
</template>

<script setup lang="ts">
	import * as z from 'zod'
	import type { FormSubmitEvent } from '#ui/types'

	const { signIn } = useAuthClient()

	const schema = z.object({
		email: z.string().email('Invalid email'),
		password: z.string(),
	})

	type Schema = z.output<typeof schema>

	const state = reactive<Partial<Schema>>({
		email: undefined,
		password: undefined,
	})

	const pending = ref(false)

	const toast = useToast()
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		await signIn.email(
			{
				email: event.data.email,
				password: event.data.password,
			},
			{
				onRequest: () => {
					pending.value = true
				},
				onResponse: () => {
					pending.value = false
				},
				onSuccess: () => {
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
