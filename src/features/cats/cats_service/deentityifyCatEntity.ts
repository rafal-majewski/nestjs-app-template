import {plainToClass} from "class-transformer";
import Cat from "../cats_controller/Cat.js";
import type CatEntity from "./CatEntity.js";

export default function deentityifyCatEntity(catEntity: CatEntity): Cat {
	return plainToClass(Cat, catEntity);
}
