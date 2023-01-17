import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({path: path.join(__dirname, ".env.test")});
import {Test} from "@nestjs/testing";
import {VersioningType} from "@nestjs/common";
import {describe, test, expect, beforeEach, afterEach} from "@jest/globals";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {CatsModule} from "../../../src/features/cats/index.js";
import * as Testcontainers from "testcontainers";
import {AppOrmModule} from "../../../src/app-orm/index.js";
import {AppConfig} from "../../../src/app-config/index.js";
import {TypedConfigModule} from "nest-typed-config";

let postgresqlContainer: Testcontainers.StartedPostgreSqlContainer | null = null;
let app: NestFastifyApplication | null = null;
beforeEach(async () => {
	postgresqlContainer = await new Testcontainers.PostgreSqlContainer().start();

	const AppConfigModule = TypedConfigModule.forRoot({
		schema: AppConfig,
		load: () => {
			if (!postgresqlContainer) {
				throw new Error("PostgreSQL container is not initialized");
			}
			return {
				POSTGRES_HOST: postgresqlContainer.getHost(),
				POSTGRES_PORT: postgresqlContainer.getPort(),
				POSTGRES_USERNAME: postgresqlContainer.getUsername(),
				POSTGRES_PASSWORD: postgresqlContainer.getPassword(),
				POSTGRES_DATABASE: postgresqlContainer.getDatabase(),
			};
		},
	});
	const appModule = await Test.createTestingModule({
		imports: [CatsModule, AppOrmModule, AppConfigModule],
	}).compile();

	app = appModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
	app.enableVersioning({
		type: VersioningType.URI,
	});
	await app.init();
	await app.getHttpAdapter().getInstance().ready();
});

afterEach(async () => {
	if (postgresqlContainer) {
		await postgresqlContainer.stop();
	}
	if (app) {
		await app.close();
	}
});

describe("HelloModule", () => {
	describe("v2", () => {
		describe("Empty database", () => {
			test("GET /cats", async () => {
				if (!app) {
					throw new Error("App is not initialized");
				}
				const response = await app.inject({
					method: "GET",
					url: "/v2/cats",
				});
				expect(response.statusCode).toBe(200);
				expect(response.json()).toEqual({
					data: [],
					meta: {skip: 0, take: 10, totalItemsCount: 0, pageItemsCount: 0},
				});
			});
			test("GET /cats/:id", async () => {
				if (!app) {
					throw new Error("App is not initialized");
				}
				const response = await app.inject({
					method: "GET",
					url: "/v2/cats/1",
				});
				expect(response.statusCode).toBe(404);
			});
			test("POST /cats", async () => {
				if (!app) {
					throw new Error("App is not initialized");
				}
				const response = await app.inject({
					method: "POST",
					url: "/v2/cats",
					payload: {
						name: "test",
						age: 1,
						breed: "test",
					},
				});
				expect(response.statusCode).toBe(201);
			});
		});
		describe("Database with one cat", () => {
			test("GET /cats", async () => {
				if (!app) {
					throw new Error("App is not initialized");
				}
				const response = await app.inject({
					method: "GET",
					url: "/v2/cats",
				});
				expect(response.statusCode).toBe(200);
				expect(response.json()).toEqual({
					data: [
						{
							id: 1,
							name: "test",
							age: 1,
							breed: "test",
						},
					],
					meta: {skip: 0, take: 10, totalItemsCount: 1, pageItemsCount: 1},
				});
			});
		});
	});
});
