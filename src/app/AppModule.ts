import {Module} from "@nestjs/common";
import AppConfigModule from "../app-config/AppConfigModule.js";
import {AppOrmModule} from "../app-orm/index.js";
import {CatsModule} from "../features/cats/index.js";

@Module({
	imports: [CatsModule, AppOrmModule, AppConfigModule],
	controllers: [],
	providers: [],
})
class AppModule {
	constructor() {}
}

export default AppModule;
