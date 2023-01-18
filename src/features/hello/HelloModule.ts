import {Module} from "@nestjs/common";
import HelloController from "./HelloController.js";
import HelloService from "./HelloService.js";
import {AppConfigModule} from "../../config/index.js";

@Module({
	imports: [AppConfigModule],
	controllers: [HelloController],
	providers: [HelloService],
})
class HelloModule {
	constructor() {}
}

export default HelloModule;
