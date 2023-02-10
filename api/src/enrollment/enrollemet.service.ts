import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "../course/models/course.entity";
import { User } from "../user/models/user.entity";
import { Repository } from "typeorm";
import { Enrollment } from "./models/enrollement.entity";


@Injectable()
export class EnrollmentService {    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Course)
        private courseRepository: Repository<Course>,

        @InjectRepository(Enrollment)
        private enrollmentRepository: Repository<Enrollment>,
    ) {}

    async enroll(userId: number, courseId: number, deadline: Date) {
        const course = await this.courseRepository.findOne({id: courseId});
        const user = await this.userRepository.findOne({id: userId})        
        
        if (course && user) {
            const enrollment = this.enrollmentRepository.create({deadline});
            enrollment.course = course;
            enrollment.user = user;    
            
            return await this.enrollmentRepository.save(enrollment)            
        }  
        return false;      
    }

    async getEnrollment(userId: number, courseId: number) {
        const enrollment = await this.enrollmentRepository.findOne({courseId, userId});
        return enrollment;
    }

    async getUserEnrollments(userId: number) {
        const enrollments = await this.enrollmentRepository.find({userId});

        if (enrollments) {            
            return enrollments;
        }
        return false;      
    }

    async updateDeadline(userId: number, courseId: number, deadline: Date) {
        const enrollment = await this.enrollmentRepository.findOne({courseId, userId});

        if (enrollment) {
            enrollment.deadline = deadline;
            return await this.enrollmentRepository.save(enrollment)            
        }           
    }

    async unenroll(userId: number, courseId: number) {        
        if (await this.enrollmentRepository.findOne({courseId, userId})) {
            return await this.enrollmentRepository.delete({courseId, userId});
        }        
        return false;     
    }

}