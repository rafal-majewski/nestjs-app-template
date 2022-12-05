import {Test} from "@nestjs/testing";
import {VersioningType} from "@nestjs/common";
import {describe, test, expect, beforeEach} from "@jest/globals";
import {HelloModule} from "../../../src/features/hello/index.js";
import {AppConfig} from "../../../src/app-config/index.js";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";

describe("HelloModule", () => {
	let app: NestFastifyApplication;
	beforeEach(async () => {
		const appModule = await Test.createTestingModule({
			imports: [HelloModule],
		})
			.overrideProvider(AppConfig)
			.useValue({
				CUSTOM_HELLO: "Hello mocked world!",
			})
			.compile();
		app = appModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
		app.enableVersioning({
			type: VersioningType.URI,
		});
		await app.init();
		await app.getHttpAdapter().getInstance().ready();
	});
	describe("v1", () => {
		test("GET /hello", async () => {
			const response = await app.inject({
				method: "GET",
				url: "/v1/hello",
			});
			expect(response.statusCode).toBe(200);
			expect(response.payload).toBe("Hello werelld!");
		});
	});
	describe("v2", () => {
		test("GET /custom-hello", async () => {
			const response = await app.inject({
				method: "GET",
				url: "/v2/custom-hello",
			});
			expect(response.statusCode).toBe(200);
			expect(response.payload).toBe("Hello mocked world!");
		});
		test("GET /hello", async () => {
			const response = await app.inject({
				method: "GET",
				url: "/v2/hello",
			});
			expect(response.statusCode).toBe(200);
			expect(response.payload).toBe("Hello world!");
		});
	});
});
