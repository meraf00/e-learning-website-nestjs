import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { UpdateDeadlineDto } from "./UpdateDeadline.dto";

export class EnrollCourseDto extends UpdateDeadlineDto {
    @IsNumber()
    @Type(() => Number)
    courseId: number
}