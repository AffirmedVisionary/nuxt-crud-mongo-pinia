import { defineStore } from "pinia";
import { AProduct } from "~~/types";
import useToast from "./useToast";

export const useProductStore = defineStore("product-store", {
	state: () => ({
		// List of all products
		products: [] as AProduct[],
	}),
	actions: {
		// Get all products from DB
		async getAll() {
			try {
				let data = await $fetch<AProduct[]>("/api/products");
				this.products = data;
				return data as AProduct[];
			} catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
				useToast().error(message);
			}
		},
		// Create a new product
		async create(product: AProduct) {
			await $fetch("/api/products/create", {
				method: "POST",
				body: product,
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Product created");
				});
		},
		// Update a product
		async update(id: string, product: AProduct) {
			await $fetch(`/api/products/${id}`, {
				method: "PUT",
				body: product,
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Product updated");
				});
		},
		// delete a product
		async remove(id: string) {
			await $fetch(`/api/products/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Product removed");
				});
		},
	},
});
