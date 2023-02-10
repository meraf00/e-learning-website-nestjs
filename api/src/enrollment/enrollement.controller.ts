import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Delete, Put, Request, Res } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import {Response} from "express";
import { EnrollmentService } from "./enrollemet.service";
import { EnrollCourseDto } from "./models/dto/EnrollCourse.dto";
import { UpdateDeadlineDto } from "./models/dto/UpdateDeadline.dto";

@Controller("enrollment")
export class EnrollentController {
    constructor(private readonly enrollmentService: EnrollmentService) {}  

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createEnrollment(@Body() body: EnrollCourseDto, @Request() req: any, @Res() res: Response) {
        const userId = req.user.id;  
        
        const response = await this.enrollmentService.enroll(userId, body.courseId, body.deadline);        
        
        if (response) {
            return res.status(HttpStatus.CREATED).send(
                {
                    status: HttpStatus.CREATED, 
                    message: "User enrolled."
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
    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    getEnrollments(@Request() req: any) {
        return this.enrollmentService.getUserEnrollments(req.user.id);        
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateEnrollmentDeadline(@Param("id") courseId: number, @Body() body: UpdateDeadlineDto, @Request() req: any, @Res() res: Response) {
        
        // update
        if (await this.enrollmentService.getEnrollment(req.user.id, courseId)) {
            const response = await this.enrollmentService.updateDeadline(req.user.id, courseId, body.deadline);
            if (response) {
                return res.status(HttpStatus.OK).send(
                    {
                        status: HttpStatus.OK, 
                        message: "Deadline updated."
                    }
                    );
                }
        }
        
        // create
        else {
            const response = await this.enrollmentService.enroll(req.user.id, courseId, body.deadline);        
            
            if (response) {
                return res.status(HttpStatus.CREATED).send(
                    {
                        status: HttpStatus.CREATED, 
                        message: "User enrolled."
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

        return res.status(HttpStatus.NOT_FOUND).send(
            {
                status: HttpStatus.NOT_FOUND, 
                message: "Unable to update deadline."
            }
        );

    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteEnrollment(@Param("id") courseId: number, @Request() req, @Res() res: Response) {
        const response = await this.enrollmentService.unenroll(req.user.id, courseId);
        if (response) {
            return res.status(HttpStatus.NO_CONTENT).send();
        }

        return res.status(HttpStatus.NOT_FOUND).send({
            status: HttpStatus.NOT_FOUND, 
            message: "Enrollment not found."
        })
    }    

}