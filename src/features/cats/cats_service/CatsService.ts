import {Injectable} from "@nestjs/common";
import {EntityNotFoundError, Repository} from "typeorm";
import CatEntity from "./CatEntity.js";
import {InjectRepository} from "@nestjs/typeorm";
import type Page from "../../../paging/Page.js";
import type PagingOptions from "../../../paging/PagingOptions.js";
import paginatedFindAndCount from "../../../paging/paginatedFindAndCount.js";
import type Cat from "../cats_controller/Cat.js";
import deentityifyCatEntity from "./deentityifyCatEntity.js";
import type CreateCatPayload from "./CreateCatPayload.js";
import CatsServiceCatWithGivenIdNotFoundError from "./CatsServiceCatWithGivenIdNotFoundError.js";

@Injectable()
class CatsService {
	private readonly catsRepository: Repository<CatEntity>;
	constructor(@InjectRepository(CatEntity) catsRepository: Repository<CatEntity>) {
		this.catsRepository = catsRepository;
	}
	public async getCats(pagingOptions: PagingOptions): Promise<Page<Cat>> {
		return (await paginatedFindAndCount(this.catsRepository, pagingOptions)).map(
			deentityifyCatEntity
		);
	}
	public async getCatById(id: string): Promise<Cat> {
		try {
			return deentityifyCatEntity(await this.catsRepository.findOneByOrFail({id}));
		} catch (error) {
			if (error instanceof EntityNotFoundError) {
				throw new CatsServiceCatWithGivenIdNotFoundError(id);
			}
			throw error;
		}
	}
	public async createCat(createCatPayload: CreateCatPayload): Promise<Cat> {
		return deentityifyCatEntity(await this.catsRepository.save(createCatPayload));
	}
}

export default CatsService;
