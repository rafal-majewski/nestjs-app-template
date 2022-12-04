import {Test} from "@nestjs/testing";
import {VersioningType} from "@nestjs/common";
import {describe, test, expect, beforeEach} from "@jest/globals";
import {AppModule} from "../../src/app/index.js";
import {AppConfig} from "../../src/app-config/index.js";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";

describe("AppModule", () => {
	let nestApp: NestFastifyApplication;
	beforeEach(async () => {
		const testingModule = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider(AppConfig)
			.useValue({
				CUSTOM_HELLO: "Hello mocked world!",
			})
			.compile();
		nestApp = testingModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
		nestApp.enableVersioning({
			type: VersioningType.URI,
		});
		await nestApp.init();
		await nestApp.getHttpAdapter().getInstance().ready();
	});

	test("GET /v2/custom-hello", async () => {
		const response = await nestApp.inject({
			method: "GET",
			url: "/v2/custom-hello",
		});
		expect(response.statusCode).toBe(200);
		expect(response.payload).toBe("Hello mocked world!");
	});

	test("GET /v1", async () => {
		const response = await nestApp.inject({
			method: "GET",
			url: "/v1",
		});
		expect(response.statusCode).toBe(200);
		expect(response.payload).toBe("Hello werelld!");
	});

	test("GET /v2", async () => {
		const response = await nestApp.inject({
			method: "GET",
			url: "/v2",
		});
		expect(response.statusCode).toBe(200);
		expect(response.payload).toBe("Hello world!");
	});
});
