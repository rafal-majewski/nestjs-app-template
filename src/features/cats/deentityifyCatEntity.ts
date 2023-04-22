import {plainToClass} from "class-transformer";
import Cat from "./Cat.js";
import type CatEntity from "./CatEntity.js";

export default function deentityifyCatEntity(catEntity: CatEntity): Cat {
	return plainToClass(Cat, {
		id: catEntity.id,
		name: catEntity.name,
		age: catEntity.age,
		breed: catEntity.breed,
	});
}
