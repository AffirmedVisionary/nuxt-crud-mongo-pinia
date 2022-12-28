import ProductModel from "~~/server/models/Product.model";
import { ProductSchema } from "~~/server/validations";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // validate
	let { error } = ProductSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create book
	try {
		await ProductModel.create(body);
		return { message: "Book created" };
	} catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
		throw createError({
			message
		});
	}
})
