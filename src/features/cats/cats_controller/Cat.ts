import {ApiProperty} from "@nestjs/swagger";

export default class Cat {
	@ApiProperty()
	readonly id!: string;
	@ApiProperty()
	readonly name!: string;
	@ApiProperty()
	readonly age!: number;
	@ApiProperty()
	readonly breed!: string;
}
