import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import CatEntity from "./CatEntity.js";
import {InjectRepository} from "@nestjs/typeorm";
import CatInPostRequest from "./CatInPostRequest.js";

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
	public async createCat(catInPostRequest: CatInPostRequest): Promise<CatEntity> {
		const catToCreate: Omit<CatEntity, "id"> = {
			age: catInPostRequest.age,
			breed: catInPostRequest.breed,
			name: catInPostRequest.name,
		};
		return this.catsRepository.save(catToCreate);
	}
}

export default CatsService;
