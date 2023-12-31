import {Module} from "@nestjs/common";
import HelloModule from "./hello/HelloModule.js";
import CatsModule from "./cats/cats_module/CatsModule.js";

@Module({
	imports: [HelloModule, CatsModule],
	controllers: [],
	providers: [],
})
class FeaturesModule {
	public constructor() {}
}

export default FeaturesModule;
