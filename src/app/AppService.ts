import {Injectable} from "@nestjs/common";
import {AppConfig} from "../app-config";

@Injectable()
class AppService {
	private readonly appConfig: AppConfig;
	constructor(appConfig: AppConfig) {
		this.appConfig = appConfig;
	}
	public getHello(): string {
		return "Hello world!";
	}
	public getCustomHello(): string {
		return this.appConfig.CUSTOM_HELLO;
	}
}

export default AppService;
