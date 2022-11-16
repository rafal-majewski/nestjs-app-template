import {Injectable} from "@nestjs/common";

@Injectable()
class AppService {
	constructor() {}
	public getHello(): string {
		return "Hello world!";
	}
}

export default AppService;
