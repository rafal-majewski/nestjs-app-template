import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import CatEntity from "./CatEntity.js";
import {InjectRepository} from "@nestjs/typeorm";
import Page from "../../../paging/Page.js";
import PagingOptions from "../../../paging/PagingOptions.js";
import paginatedFindAndCount from "../../../paging/paginatedFindAndCount.js";
import type Cat from "../cats_controller/Cat.js";
import deentityifyCatEntity from "./deentityifyCatEntity.js";
import CreateCatPayload from "./CreateCatPayload.js";

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
		return deentityifyCatEntity(await this.catsRepository.findOneByOrFail({id}));
	}
	public async createCat(createCatPayload: CreateCatPayload): Promise<Cat> {
		return deentityifyCatEntity(await this.catsRepository.save(createCatPayload));
	}
}

export default CatsService;
