import type {SelectQueryBuilder, ObjectLiteral} from "typeorm";
import Page from "./Page.js";
import type PagingOptions from "./PagingOptions.js";
import buildPage from "./buildPage.js";

export default async function paginateSelectQueryBuilder<Entity extends ObjectLiteral>(
	selectQueryBuilder: SelectQueryBuilder<Entity>,
	pagingOptions: PagingOptions
): Promise<Page<Entity>> {
	const [entities, total]: [readonly Entity[], number] = await selectQueryBuilder
		.skip(pagingOptions.skip)
		.take(pagingOptions.take)
		.getManyAndCount();

	const page = buildPage({
		data: entities,
		totalItemsCount: total,
		skip: pagingOptions.skip,
		take: pagingOptions.take,
	});

	return page;
}
