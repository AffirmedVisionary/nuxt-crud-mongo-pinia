import MerchantModel from "~~/server/models/Merchant.model";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove book
	try {
		await MerchantModel.findByIdAndDelete(id);
		return { message: "Merchant removed" };
	} catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
		throw createError({
			message
		});
	}
});
