import {ApiProperty} from "@nestjs/swagger";
import {Exclude, Expose} from "class-transformer";

@Exclude()
export default class Cat {
	@Expose()
	@ApiProperty()
	readonly id!: string;
	@Expose()
	@ApiProperty()
	readonly name!: string;
	@Expose()
	@ApiProperty()
	readonly age!: number;
	@Expose()
	@ApiProperty()
	readonly breed!: string;
}
