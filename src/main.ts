import {NestFactory} from "@nestjs/core";
import AppModule from "./app.module";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";

const bootstrap = async (): Promise<void> => {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	await app.listen(3000);
};
bootstrap();
