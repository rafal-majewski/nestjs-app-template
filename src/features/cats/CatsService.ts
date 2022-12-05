import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import CatEntity from "./CatEntity.js";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
class CatsService {
	private readonly catsRepository: Repository<CatEntity>;
	constructor(@InjectRepository(CatEntity) catsRepository: Repository<CatEntity>) {
		this.catsRepository = catsRepository;
	}
	public async getCats(): Promise<CatEntity[]> {
		return this.catsRepository.find();
	}
	public async getCatById(id: string): Promise<CatEntity> {
		return this.catsRepository.findOneByOrFail({id});
	}
}

export default CatsService;
