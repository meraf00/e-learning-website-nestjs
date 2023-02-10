import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class QueryCourseDto {

    @IsNumber()
    @Type(() => Number)
    page: number = 0

    @IsNumber()
    @Type(() => Number)
    limit: number = 50
    
    title?: string;
    
    length?: string;
        
    difficulty?: string;
}