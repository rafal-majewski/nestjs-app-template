import {Controller, Get, Version} from "@nestjs/common";
import AppService from "./AppService.js";

@Controller()
class AppController {
	private readonly appService: AppService;

	constructor(appService: AppService) {
		this.appService = appService;
	}
	@Version("2")
	@Get()
	public getHello(): string {
		return this.appService.getHello();
	}
	@Version("1")
	@Get()
	public getOldHello(): string {
		return this.appService.getOldHello();
	}
	@Version(["1", "2"])
	@Get("custom-hello")
	public getCustomHello(): string {
		return this.appService.getCustomHello();
	}
}

export default AppController;
