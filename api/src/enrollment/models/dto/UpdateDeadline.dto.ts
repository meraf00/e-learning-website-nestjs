import { Type } from "class-transformer";
import { IsDate, MinDate } from "class-validator";

export class UpdateDeadlineDto {
    @IsDate()
    @MinDate(new Date())
    @Type(() => Date)
    deadline: Date
}