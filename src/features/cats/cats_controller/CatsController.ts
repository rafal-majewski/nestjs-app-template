import {
	Body,
	Controller,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
	ValidationPipe,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConsumes,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiProduces,
	ApiTags,
} from "@nestjs/swagger";
import Cat from "./Cat.js";
import CreateCatRequestBody from "./CreateCatRequestBody.js";
import CatsService from "../cats_service/CatsService.js";
import Page from "../../../paging/Page.js";
import PagingOptions from "../../../paging/PagingOptions.js";
import ApiPaginatedOkResponse from "../../../paging/ApiPaginatedOkResponse.js";
import payloadifyCreateCatRequestBody from "./payloadifyCreateCatRequestBody.js";
import CatsServiceCatWithGivenIdNotFoundError from "../cats_service/CatsServiceCatWithGivenIdNotFoundError.js";

@ApiTags("cats")
@ApiProduces("application/json")
@Controller("/cats")
class CatsController {
	private readonly catsService: CatsService;
	constructor(catsService: CatsService) {
		this.catsService = catsService;
	}
	@ApiPaginatedOkResponse({
		description: "All cats",
		type: Cat,
	})
	@Get("/")
	public async getAllCats(
		@Query(
			new ValidationPipe({
				transform: true, // Transform to instance of PagingOptions
				whitelist: true, // Do not put other query parameters into the object
			})
		)
		pagingOptions: PagingOptions
	): Promise<Page<Cat>> {
		return this.catsService.getCats(pagingOptions);
	}
	@ApiOkResponse({
		description: "Cat with given id",
		type: Cat,
	})
	@ApiNotFoundResponse({
		description: "Cat with given id not found",
	})
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
	): Promise<Cat> {
		try {
			const targetCat = await this.catsService.getCatById(id);
			return targetCat;
		} catch (error) {
			if (error instanceof CatsServiceCatWithGivenIdNotFoundError) {
				throw new NotFoundException(`Cat with id "${id}" not found`);
			}
			throw error;
		}
	}
	@ApiCreatedResponse({
		description: "Cat created",
		type: Cat,
	})
	@ApiBadRequestResponse({
		description: "Invalid cat data",
	})
	@ApiBody({
		description: "Cat to create",
		type: CreateCatRequestBody,
	})
	@ApiConsumes("application/json")
	@Post("/")
	public async createCat(
		@Body(
			new ValidationPipe({
				transform: true, // Transform to instance of CreateCatRequestBody
				whitelist: true, // Do not allow other properties than those defined in CreateCatRequestBody
				forbidNonWhitelisted: true, // Throw an error if other properties than those defined in CreateCatRequestBody are present
			})
		)
		createCatRequestBody: CreateCatRequestBody
	): Promise<Cat> {
		return this.catsService.createCat(payloadifyCreateCatRequestBody(createCatRequestBody));
	}
}

export default CatsController;
