import type Zod from "zod";
import type openApiConfigSchema from "./openApiConfigSchema.js";

type OpenApiConfig = Readonly<Zod.infer<typeof openApiConfigSchema>>;

export default OpenApiConfig;
