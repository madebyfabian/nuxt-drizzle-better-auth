<template>
	<UCard>
		<template #header>
			<h2 class="mb-0">Passkey</h2>
		</template>

		<USkeleton v-if="status === 'pending'" class="h-4 w-[250px]" />

		<div v-else>
			<UTable
				class="-mx-4 -mt-4"
				:data="data || []"
				:columns="[
					{ accessorKey: 'id' },
					{ accessorKey: 'createdAt' },
					{
						id: 'actions',
						cell: ({ row }) => {
							return h(
								'div',
								{ class: 'text-right' },
								h(
									UDropdownMenu,
									{
										content: {
											align: 'end',
										},
										items: [
											{
												label: 'Delete',
												color: 'error',
												onSelect() {
													handleDeletePasskey(row.original.id)
												},
											},
										],
									},
									() =>
										h(UButton, {
											icon: 'i-lucide-ellipsis-vertical',
											color: 'neutral',
											variant: 'ghost',
											class: 'ml-auto',
										})
								)
							)
						},
					},
				]"
			>
				<template #empty>No passkeys found</template>
			</UTable>

			<UButton @click="handleAddPasskey" :loading="pendingAdd" class="mt-4">
				Add passkey
			</UButton>
		</div>
	</UCard>
</template>

<script setup lang="ts">
	const { passkey } = useAuthClient()
	const toast = useToast()

	const UButton = resolveComponent('UButton')
	const UDropdownMenu = resolveComponent('UDropdownMenu')

	const { data, refresh, status } = useLazyAsyncData(
		'AppSettingsPasskey:passkeys',
		async () => {
			const res = await passkey.listUserPasskeys()
			if (res.error) {
				throw res.error
			}
			return res.data
		}
	)

	const pendingDelete = ref(false)
	const handleDeletePasskey = async (id: string) => {
		await passkey.deletePasskey(
			{
				id,
			},
			{
				onRequest: () => {
					pendingDelete.value = true
				},
				onResponse: () => {
					pendingDelete.value = false
				},
				onSuccess: () => {
					toast.add({
						title: 'Success',
						description: 'Your passkey has been deleted!',
						color: 'success',
					})
					refresh()
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

	const pendingAdd = ref(false)
	const handleAddPasskey = async () => {
		await passkey.addPasskey(undefined, {
			onRequest: () => {
				pendingAdd.value = true
			},
			onResponse: () => {
				pendingAdd.value = false
			},
			onSuccess: () => {
				toast.add({
					title: 'Success',
					description: 'Your passkey has been added!',
					color: 'success',
				})
				refresh()
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
