import {Test, TestingModule} from "@nestjs/testing";
import AppController from "../src/app.controller";
import AppService from "../src/app.service";
import {describe, test, expect, beforeEach} from "@jest/globals";

describe("AppController", () => {
	let appController: AppController;

	beforeEach(async () => {
		const appModule: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();
		appController = appModule.get<AppController>(AppController);
	});

	describe("/", () => {
		test('should return "Hello world!"', () => {
			expect(appController.getHello()).toBe("Hello world!");
		});
	});
});
