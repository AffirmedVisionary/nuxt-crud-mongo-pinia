// connect to mongo db database
// using a nitro plugin nitro.unjs.io

import mongoose from "mongoose";
import { Nitro } from "nitropack"

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((e) => console.log(e));
};
