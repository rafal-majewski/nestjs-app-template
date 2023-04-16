import {NestFactory} from "@nestjs/core";
import AppModule from "./AppModule.js";
import {FastifyAdapter, type NestFastifyApplication} from "@nestjs/platform-fastify";
import AppConfig from "./app_config/AppConfig.js";
import {VersioningType} from "@nestjs/common";

const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
app.enableVersioning({
	type: VersioningType.URI,
	defaultVersion: "2",
});
const appConfig = app.get(AppConfig);
await app.listen(appConfig.PORT);
console.log(`Next.js server listening at ${await app.getUrl()}`);
