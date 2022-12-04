import {NestFactory} from "@nestjs/core";
import {HelloModule} from "./features/hello/index.js";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {AppConfig} from "./app-config/index.js";
import {VersioningType} from "@nestjs/common";

const bootstrap = async (): Promise<void> => {
	const app = await NestFactory.create<NestFastifyApplication>(HelloModule, new FastifyAdapter());
	app.enableVersioning({
		type: VersioningType.URI,
	});
	const appConfig = app.get(AppConfig);
	await app.listen(appConfig.PORT);
	console.log(`Next.js server listening at ${await app.getUrl()}`);
};
bootstrap();
