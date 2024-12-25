<template>
	<div>
		<h1>Hello world</h1>
		<p>Welcome to your new Nuxt 3 app.</p>

		<div class="flex gap-2 mt-4">
			<UButton to="/auth/signup">Create an account</UButton>
			<UButton to="/auth/login" variant="outline">Login</UButton>
		</div>

		<UButton to="/app" variant="outline" class="mt-4">Go to app</UButton>
	</div>
</template>
