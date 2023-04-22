import type CreateCatRequestBody from "./CreateCatRequestBody.js";
import CreateCatPayload from "../cats_service/CreateCatPayload.js";
import {plainToClass} from "class-transformer";

export default function payloadifyCreateCatRequestBody(
	createCatRequestBody: CreateCatRequestBody
): CreateCatPayload {
	return plainToClass(CreateCatPayload, createCatRequestBody);
}
