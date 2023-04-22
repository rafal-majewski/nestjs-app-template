import {plainToClass} from "class-transformer";
import type {Repository, FindOneOptions, ObjectLiteral} from "typeorm";
import Page from "./Page.js";
import PageMeta from "./PageMeta.js";
import type PagingOptions from "./PagingOptions.js";

async function paginatedFindAndCount<Entity extends ObjectLiteral>(
	repository: Repository<Entity>,
	pagingOptions: PagingOptions,
	findOneOptions: FindOneOptions<Entity> = {}
): Promise<Page<Entity>> {
	const [entities, total]: [readonly Entity[], number] = await repository.findAndCount({
		...findOneOptions,
		...pagingOptions,
	});
	const pageMeta: PageMeta = {
		totalItemsCount: total,
		pageItemsCount: entities.length,
		skip: pagingOptions.skip,
		take: pagingOptions.take,
	};

	const page = plainToClass(Page, {
		meta: pageMeta,
		data: entities,
	}) as Page<Entity>;

	return page;
}

export default paginatedFindAndCount;
