import {Controller, Get} from "@nestjs/common";
import CatEntity from "./CatEntity.js";
import CatsService from "./CatsService.js";

@Controller("/cats")
class CatsController {
	private readonly catsService: CatsService;
	constructor(catsService: CatsService) {
		this.catsService = catsService;
	}
	@Get("/")
	public async getAllCats(): Promise<CatEntity[]> {
		return this.catsService.getCats();
	}
}

export default CatsController;
