import {IsInt, IsString, Min, Max} from "class-validator";
import {Type} from "class-transformer";

class AppConfig {
	// Required setting
	// @IsString()
	// public readonly CUSTOM_HELLO!: string;

	// Optional setting
	@IsString()
	public readonly CUSTOM_HELLO: string = "Hello customizable world!";

	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(65535)
	public readonly PORT: number = 3000;
}

export default AppConfig;
