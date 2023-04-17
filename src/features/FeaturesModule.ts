import {Module} from "@nestjs/common";
import HelloModule from "./hello/HelloModule.js";
import CatsModule from "./cats/CatsModule.js";

@Module({
	imports: [HelloModule, CatsModule],
	controllers: [],
	providers: [],
})
class FeaturesModule {
	constructor() {}
}

export default FeaturesModule;
