import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/models/user.entity";
import { Course } from "../course/models/course.entity";
import { Rating } from "./models/rating.entity";


@Injectable()
export class RatingService {    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Course)
        private courseRepository: Repository<Course>,

        @InjectRepository(Rating)
        private ratingRepository: Repository<Rating>,        
    ) { }
    
    
    async rateCourse(userId: number, courseId: number, userRating: number) {
        const course = await this.courseRepository.findOne({id: courseId});
        const user = await this.userRepository.findOne({id: userId})

        if (course && user) {
            const rating = this.ratingRepository.create({rating: userRating});
            rating.course = course;
            rating.user = user;            
            
            return await this.ratingRepository.save(rating)            
        }  
        return false;      
    }

    async getUserCourseRating(userId: number, courseId: number) {        
        return await this.ratingRepository.findOne({userId, courseId});
    }

    async deleteRating(userId: number, courseId: number) {        
        if (await this.ratingRepository.findOne({courseId, userId})) {
            return await this.ratingRepository.delete({courseId, userId});
        }        
        return false;     
    }
}