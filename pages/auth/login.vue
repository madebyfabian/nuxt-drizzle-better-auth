<template>
	<div>
		<h1>Login</h1>

		<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="Email" name="email">
				<UInput v-model="state.email" autocomplete="email webauthn" />
			</UFormField>

			<UFormField label="Password" name="password">
				<UInput
					v-model="state.password"
					type="password"
					autocomplete="current-password webauthn"
				/>
			</UFormField>

			<div>
				<UButton variant="link" to="/auth/forgot-password">
					<span>Forgot password?</span>
				</UButton>
			</div>

			<UButton type="submit">Submit</UButton>
		</UForm>

		<div class="mt-4">or</div>

		<div class="flex items-start flex-col gap-4 mt-4">
			<UButton to="/auth/login-magic-link" color="neutral" variant="outline">
				Send magic link
			</UButton>
			<UButton
				@click="() => handleLoginWithPasskey()"
				color="neutral"
				variant="outline"
			>
				Login with passkey
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
	import * as z from 'zod'
	import type { FormSubmitEvent } from '#ui/types'

	const { signIn } = useAuthClient()

	/**
	 * This preloads the passkeys for the browser to auto-fill them
	 * @see https://www.better-auth.com/docs/plugins/passkey#preload-the-passkeys
	 **/
	onMounted(() => {
		void signIn.passkey(
			{ autoFill: true },
			{
				onSuccess: () => {
					navigateTo('/app')
				},
			}
		)
	})

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

	async function handleLoginWithPasskey() {
		await signIn.passkey(undefined, {
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
		})
	}
</script>
