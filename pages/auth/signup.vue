<template>
	<div>
		<h1>Sign up</h1>

		<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="Name" name="name">
				<UInput v-model="state.name" />
			</UFormField>

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

	const { signUp } = useAuthClient()

	const schema = z.object({
		name: z.string().min(1),
		email: z.string().email('Invalid email'),
		password: z.string(),
	})

	type Schema = z.output<typeof schema>

	const state = reactive<Partial<Schema>>({
		name: undefined,
		email: undefined,
		password: undefined,
	})

	const pending = ref(false)

	const toast = useToast()
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		await signUp.email(
			{
				name: event.data.name,
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
					toast.add({
						title: 'Success',
						description: 'You have successfully signed up!',
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
