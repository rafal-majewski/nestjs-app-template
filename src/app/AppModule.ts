import {Module} from "@nestjs/common";
import AppController from "./AppController.js";
import AppService from "./AppService.js";
import {AppConfigModule} from "../app-config/index.js";

@Module({
	imports: [AppConfigModule],
	controllers: [AppController],
	providers: [AppService],
})
class AppModule {
	constructor() {}
}

export default AppModule;
