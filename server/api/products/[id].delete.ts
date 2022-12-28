import ProductModel from "~~/server/models/Product.model";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove book
	try {
		await ProductModel.findByIdAndDelete(id);
		return { message: "Product removed" };
	} catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
		throw createError({
			message
		});
	}
});
