import { Body, Controller, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Delete, Get, Request, Res } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RatingService } from "./rating.service";
import { RateCourseDto } from "./models/dto/RateCourse.dto";
import {Response} from "express";

@Controller("rating")
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}  
         
    @UseGuards(JwtAuthGuard)
    @Post(":id")
    @UsePipes(new ValidationPipe({ transform: true }))
    async rateCourse(@Param("id") courseId: number, @Body() body: RateCourseDto, @Request() req: any, @Res() res: Response) {
        const userId = req.user.id;        
        const response = await this.ratingService.rateCourse(userId, courseId, body.rating);
        if (response) {
            return res.status(HttpStatus.OK).send(
                {
                    status: HttpStatus.OK, 
                    course: response.course.title, 
                    rating: body.rating
                }
                );
        }

        return res.status(HttpStatus.NOT_FOUND).send(
            {
                status: HttpStatus.NOT_FOUND, 
                message: "Course not found."
            }
            );
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUserCourseRating(@Param("id") courseId: number, @Request() req: any, @Res() res: Response) {
        
        const response = await this.ratingService.getUserCourseRating(req.user.id, courseId);
        
        if (response) {
            return res.status(HttpStatus.OK).send(
                {
                    status: HttpStatus.OK,                     
                    rating: response.rating
                }
                );
        }

        return res.status(HttpStatus.NOT_FOUND).send(
            {
                status: HttpStatus.NOT_FOUND, 
                message: "User has not rated this course."
            }
            );
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteRating(@Param("id") courseId: number, @Request() req, @Res() res: Response) { 
        const response = await this.ratingService.deleteRating(req.user.id, courseId);

        if (response) {
            return res.status(HttpStatus.NO_CONTENT).send();
        }
                
        return res.status(HttpStatus.NOT_FOUND).send({
            status: HttpStatus.NOT_FOUND, 
            message: "Rating not found."
        })
        
    }

}