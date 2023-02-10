import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CourseService } from "./course.service";
import { QueryCourseDto } from "./models/dto/QueryCourse.dto";


@Controller("course")
export class CourseController {
    constructor(private readonly courseService: CourseService) {}  
    
    @Get()
    @UsePipes(new ValidationPipe({ transform: true })) 
    async getAllCourses (@Query() query: QueryCourseDto) {
        return await this.courseService.getPaginatedCourses(query);
    }

    @Get(":id")    
    async getCourse (@Param("id") id: number) {
        return await this.courseService.getCourseById(id);
    }    
}