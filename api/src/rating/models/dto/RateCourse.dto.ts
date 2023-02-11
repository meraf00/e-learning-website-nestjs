import { Type } from "class-transformer";
import { IsEmpty, IsNumber, IsString } from "class-validator";

export class RateCourseDto {

    @IsNumber()
    @Type(() => Number)    
    rating: number    
}