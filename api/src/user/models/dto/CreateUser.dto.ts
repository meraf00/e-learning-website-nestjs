import { IsString } from "class-validator";
import { LoginUserDto } from "./LoginUser.dto";


export class CreateUserDto extends LoginUserDto {

    @IsString()
    firstname: string; 

    @IsString()
    lastname: string; 

}