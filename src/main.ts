import {NestFactory} from "@nestjs/core";
import AppModule from "./app.module";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {AppConfig} from "./app-config";

const bootstrap = async (): Promise<void> => {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	const appConfig = app.get(AppConfig);
	await app.listen(appConfig.PORT);
	console.log(`Next.js server listening at ${await app.getUrl()}`);
};
bootstrap();
