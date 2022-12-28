import ProductModel from "~~/server/models/Product.model";
import { ProductSchema } from "~~/server/validations";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	// get id from params
	const id = event.context.params.id;

	// validate
	let { error } = ProductSchema.validate(body, { abortEarly: true, allowUnknown: true });
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// Update book
	try {
		await ProductModel.findByIdAndUpdate(id, body);
		return { message: "Product updated" };
	} catch (error)  {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
		throw createError({
			message
		});
	}
});
