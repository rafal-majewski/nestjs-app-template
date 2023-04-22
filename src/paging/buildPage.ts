import {plainToClass} from "class-transformer";
import Page from "./Page.js";
import PageMeta from "./PageMeta.js";

export default function buildPage<T>({
	data,
	totalItemsCount,
	skip,
	take,
}: {
	data: readonly T[];
	totalItemsCount: number;
	skip: number;
	take: number;
}): Page<T> {
	const pageMeta: Readonly<PageMeta> = {
		totalItemsCount,
		pageItemsCount: data.length,
		skip,
		take,
	};

	const page: Page<T> = plainToClass(Page, {
		meta: pageMeta,
		data,
	}) as Page<T>;

	return page;
}
