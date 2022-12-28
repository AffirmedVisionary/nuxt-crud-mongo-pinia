import { defineStore } from "pinia";
import { AMerchant } from "../types"
import useToast from "./useToast";

export const useMerchantStore = defineStore("merchant-store", {
	state: () => ({
		merchants: [] as AMerchant[],
	}),
	actions: {
		// Get all merchants from DB
		async getAll() {
			try {
				let data = await $fetch<AMerchant[]>("/api/merchants");
				this.merchants = data;
				return data as AMerchant[];
			} catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
				useToast().error(message);
			}
		},
		// Create a new merchant
		async create(name: string) {
			await $fetch("/api/merchants/create", {
				method: "POST",
				body: { name },
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Merchant created");
				});
		},
		// Update an merchant
		async update(id: string, name: string) {
			await $fetch(`/api/merchants/${id}`, {
				method: "PUT",
				body: { name },
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Merchant updated");
				});
		},
		// delete an merchant
		async remove(id: string) {
			await $fetch(`/api/merchants/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Merchant removed");
				});
		},
	},
});
