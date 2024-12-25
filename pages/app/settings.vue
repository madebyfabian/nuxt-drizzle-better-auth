<template>
	<div class="flex flex-col gap-8">
		<AppSettingsChangeEmail />
		<AppSettingsChangePassword />
		<div class="flex">
			<AppSettingsDeleteAccount />
		</div>
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		layout: 'app',
	})
</script>
