import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class RateCourseDto {

    @IsNumber()
    @Type(() => Number)    
    rating: number    
}