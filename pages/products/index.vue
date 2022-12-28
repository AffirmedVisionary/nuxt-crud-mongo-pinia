<template>
	<div class="min-h-screen">
		<main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
			<!-- Page title -->
			<h1 class="text-2xl font-medium">Products</h1>
			<p class="mt-2 text-sm text-gray-500">Manage your products here</p>

			<div
				class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
			>
				<div class="relative w-full md:mr-10 grow">
					<span class="absolute -translate-y-1/2 top-1/2 left-3">
						<Icon name="ep:search" size="24" class="text-gray-400" />
					</span>
					<input
						placeholder="Search products..."
						v-model="search"
						type="search"
						name="search"
						id="search"
						class="pl-11 input"
					/>
				</div>
				<button
					@click="productModal.openModal()"
					class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
				>
					Add Product
				</button>
			</div>

			<div class="relative mt-5 border border-gray-100 rounded-lg">
				<ClientOnly>
					<EasyDataTable
						:search-value="search"
						empty-message="No Product Found"
						theme-color="#f97316"
						table-class-name="eztble"
						:headers="headers"
						:items="productStore.products"
					>
						<!-- Show title with custom styles -->
						<template #item-title="{ title }">
							<span class="font-semibold">{{ title }}</span>
						</template>

						<!-- Action items for table -->
						<template #item-actions="product">
							<div class="flex space-x-4 text-gray-500">
								<button @click="productModal.openModal(product)">
									<Icon size="18" name="fluent:pen-24-regular" />
								</button>
								<button @click="removeProduct(product)">
									<Icon size="18" name="fluent:delete-24-regular" />
								</button>
							</div>
						</template>
					</EasyDataTable>
				</ClientOnly>
			</div>
		</main>
		<!-- Product modal comp -->
		<ProductModal ref="productModal" />
	</div>
</template>

<script setup lang="ts">
	import { Header } from "vue3-easy-data-table";
import { AProduct } from "~~/types";
	// Product store from pinia
	const productStore = useProductStore();
	// Get products with async data
	await useAsyncData(() => productStore.getAll());
	// Modal refence - used to open modal
	const productModal = ref();
	//Search for record in table
	const search = ref("");
	// headers for the table
	const headers: Header[] = [
		{ text: "Title", value: "name", sortable: true, width: 200 },
    { text: "Price", value: "price", width: 150 },
		{ text: "Summary", value: "summary" },
    { text: "Digital?", value: "digital", width: 30},
		{ text: "Hash", value: "hash", sortable: true },
		{ text: "Actions", value: "actions", width: 100 },
	];
	// Method used to remove a product
	const removeProduct = async (product: AProduct) => {
		await productStore.remove(product._id as string);
	};
</script>
