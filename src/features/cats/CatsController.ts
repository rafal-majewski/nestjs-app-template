import {
	Body,
	Controller,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Post,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import {EntityNotFoundError} from "typeorm";
import CatEntity from "./CatEntity.js";
import CatInPostRequest from "./CatInPostRequest.js";
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
	@Get("/:id")
	public async getCatById(
		@Param(
			"id",
			new ParseUUIDPipe({
				errorHttpStatusCode: HttpStatus.NOT_FOUND,
				version: "4",
			})
		)
		id: string
	): Promise<CatEntity> {
		try {
			const targetCat = await this.catsService.getCatById(id);
			return targetCat;
		} catch (error) {
			if (error instanceof EntityNotFoundError) {
				throw new NotFoundException(`Cat with id "${id}" not found`);
			}
			throw error;
		}
	}
	@Post("/")
	@UsePipes(
		new ValidationPipe({
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
			stopAtFirstError: false,
			whitelist: true,
		})
	)
	public async createCat(@Body() catInPostRequest: CatInPostRequest): Promise<CatEntity> {
		return this.catsService.createCat(catInPostRequest);
	}
}

export default CatsController;
