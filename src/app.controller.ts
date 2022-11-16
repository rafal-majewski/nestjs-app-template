import {Controller, Get} from "@nestjs/common";
import AppService from "./app.service";

@Controller()
class AppController {
	private readonly appService: AppService;

	constructor(appService: AppService) {
		this.appService = appService;
	}
	@Get()
	public getHello(): string {
		return this.appService.getHello();
	}
	@Get("custom-hello")
	public getCustomHello(): string {
		return this.appService.getCustomHello();
	}
}

export default AppController;
