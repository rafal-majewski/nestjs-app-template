import {FastifyAdapter, type NestFastifyApplication} from "@nestjs/platform-fastify";
import {VersioningType} from "@nestjs/common";
import openApiConfigSchema from "./openApiConfigSchema.js";
const openApiConfig = await openApiConfigSchema.parse(
	(
		await import("../../openapi.config.js")
	).default,
);

import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import * as Path from "path";
import * as Fs from "fs/promises";
import {Test} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import CatEntity from "../../src/features/cats/cats_service/CatEntity.js";
import CatsModule from "../../src/features/cats/cats_module/CatsModule.js";
import HelloModule from "../../src/features/hello/HelloModule.js";

const appModule = await Test.createTestingModule({
	imports: [CatsModule, HelloModule],
})
	.overrideProvider(getRepositoryToken(CatEntity))
	.useValue(null)
	.compile();

const app = appModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
app.enableVersioning({
	type: VersioningType.URI,
});

const swaggerOptions = new DocumentBuilder()
	.setTitle(openApiConfig.info.title)
	.setVersion(openApiConfig.info.version)
	.build();
const document = SwaggerModule.createDocument(app, swaggerOptions);
const outputFilePath = openApiConfig.outputFilePath ?? Path.join("openapi", "openapi.json");
await Fs.mkdir(Path.dirname(outputFilePath), {recursive: true});
const outputPath = Path.resolve(process.cwd(), outputFilePath);
await Fs.writeFile(outputPath, JSON.stringify(document), {encoding: "utf8"});
