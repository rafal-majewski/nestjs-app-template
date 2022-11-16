import {Test, TestingModule} from "@nestjs/testing";
import {AppController, AppService} from "../src/app";
import {describe, test, expect, beforeEach} from "@jest/globals";
import {AppConfig} from "../src/app-config";

describe("AppController", () => {
	let appController: AppController;

	beforeEach(async () => {
		const appModule: TestingModule = await Test.createTestingModule({
			imports: [],
			controllers: [AppController],
			providers: [AppService],
		})
			.useMocker((token) => {
				if (token === AppConfig) {
					return {
						CUSTOM_HELLO: "Hello mocked world!",
					};
				}
				return undefined;
			})
			.compile();
		appController = appModule.get<AppController>(AppController);
	});

	describe("/", () => {
		test('should return "Hello mocked world!"', () => {
			expect(appController.getCustomHello()).toBe("Hello mocked world!");
		});
	});
});
