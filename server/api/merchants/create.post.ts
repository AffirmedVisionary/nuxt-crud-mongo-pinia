import MerchantModel from "~~/server/models/Merchant.model";
import { MerchantSchema } from "~~/server/validations";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // validate
	let { error } = MerchantSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create book
	try {
		await MerchantModel.create(body);
		return { message: "Merchant created" };
	} catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
		throw createError({
			message
		});
	}
})
