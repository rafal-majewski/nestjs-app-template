import {plainToClass} from "class-transformer";
import type {SelectQueryBuilder, ObjectLiteral} from "typeorm";
import Page from "./Page.js";
import PageMeta from "./PageMeta.js";
import type PagingOptions from "./PagingOptions.js";

export default async function paginateSelectQueryBuilder<Entity extends ObjectLiteral>(
	selectQueryBuilder: SelectQueryBuilder<Entity>,
	pagingOptions: PagingOptions
): Promise<Page<Entity>> {
	const [entities, total]: [readonly Entity[], number] = await selectQueryBuilder
		.skip(pagingOptions.skip)
		.take(pagingOptions.take)
		.getManyAndCount();
	const pageMeta: Readonly<PageMeta> = {
		totalItemsCount: total,
		pageItemsCount: entities.length,
		skip: pagingOptions.skip,
		take: pagingOptions.take,
	};

	const page: Page<Entity> = plainToClass(Page, {
		meta: pageMeta,
		data: entities,
	}) as Page<Entity>;

	return page;
}
