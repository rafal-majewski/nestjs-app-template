export default class CatsServiceCatWithGivenIdNotFoundError extends Error {
	public catId: string;

	public constructor(catId: string) {
		super(`Cat with id "${catId}" not found`);
		this.catId = catId;
	}
}
