<template>
	<div class="min-h-screen">
		<main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
			<!-- Page title -->
			<h1 class="text-2xl font-medium">Merchants</h1>
			<p class="mt-2 text-sm text-gray-500">Manage your merchants here</p>

			<div
				class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
			>
				<div class="relative w-full md:mr-10 grow">
					<span class="absolute -translate-y-1/2 top-1/2 left-3">
						<Icon name="ep:search" size="24" class="text-gray-400" />
					</span>
					<input
						placeholder="Search merchant..."
						v-model="search"
						type="search"
						name="search"
						id="search"
						class="pl-11 input"
					/>
				</div>
				<button
					@click="merchantModal.openModal()"
					class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
				>
					Add Merchant
				</button>
			</div>

			<div class="relative mt-5 border border-gray-100 rounded-lg">
				<ClientOnly>
					<EasyDataTable
						empty-message="No Merchant Found"
						:search-value="search"
						theme-color="#041F1D"
						table-class-name="eztble"
						:headers="headers"
						:items="merchantStore.merchants"
					>
						<!-- Show merchants  -->
						<template #item-name="{ name }">
							<span class="font-semibold">{{ name }}</span>
						</template>
						<!-- Action items for table -->
						<template #item-actions="merchant">
							<div class="flex space-x-4 text-gray-500">
								<button @click="merchantModal.openModal(merchant)">
									<Icon size="18" name="fluent:pen-24-regular" />
								</button>
								<button @click="removeMerchant(merchant)">
									<Icon size="18" name="fluent:delete-24-regular" />
								</button>
							</div>
						</template>
					</EasyDataTable>
				</ClientOnly>
			</div>
		</main>
		<!-- Merchant modal comp -->
		<MerchantModal ref="merchantModal" />
	</div>
</template>

<script setup lang="ts">
	import { Header } from "vue3-easy-data-table";
import { AMerchant } from "~~/types";
	// Merchant store
	const merchantStore = useMerchantStore();
	// get data on page load
	useAsyncData(async () => await merchantStore.getAll(),);
	// Modal ref
	const merchantModal = ref();
	//Search for merchant in table
	const search = ref("");
	// Method used to remove an merchant
	const removeMerchant = async (merchant: AMerchant) => {
		await merchantStore.remove(merchant._id as string);
	};
	// Table headers
	const headers: Header[] = [
		{ text: "Merchant Name", value: "name", sortable: true },
		{ text: "Actions", value: "actions", width: 100 },
	];
</script>
