import {Module} from "@nestjs/common";
import AppController from "./AppController";
import AppService from "./AppService";
import {AppConfigModule} from "../app-config";

@Module({
	imports: [AppConfigModule],
	controllers: [AppController],
	providers: [AppService],
})
class AppModule {
	constructor() {}
}

export default AppModule;
