import {Module} from "@nestjs/common";
import CatsController from "../cats_controller/CatsController.js";
import CatsService from "../cats_service/CatsService.js";
import {TypeOrmModule} from "@nestjs/typeorm";
import CatEntity from "../cats_service/CatEntity.js";

@Module({
	imports: [TypeOrmModule.forFeature([CatEntity])],
	controllers: [CatsController],
	providers: [CatsService],
})
class CatsModule {
	public constructor() {}
}

export default CatsModule;
