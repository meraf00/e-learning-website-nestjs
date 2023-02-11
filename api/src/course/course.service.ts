import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/models/user.entity";
import { QueryCourseDto } from "./models/dto/QueryCourse.dto";
import { Course } from "./models/course.entity";

@Injectable()
export class CourseService {    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
              
    ) {
        this.seed();
    }

    async seed() {
        // await this.courseRepository.clear();

        let discreteMath = new Course();
        discreteMath.id = 1; 
        discreteMath.title = "Discrete Math";
        discreteMath.difficulty = "Intermediate";        
        discreteMath.description = 'This course covers mathematical structures that can be considered "discrete" rather than "continuous"';        
        discreteMath.img_url = 'images/courses/discrete-mathematics.png';
        await this.courseRepository.save(discreteMath);
        
        let oop = new Course();
        oop.id = 2;
        oop.title = "Object Oriented Programming";
        oop.difficulty = "Beginner";        
        oop.description = 'This course will introduce students to the paradigm of object oriented programming using Java'
        oop.img_url = 'images/courses/oop.png';
        await this.courseRepository.save(oop);  

        let networking = new Course();
        networking.id = 3;
        networking.title = "Fundamentals of Networking";
        networking.difficulty = "Intermediate";        
        networking.description = 'This course introduces students to networking. They will learn to configure and troubleshot networks.'
        networking.img_url = 'images/courses/networking.png';
        await this.courseRepository.save(networking);        
    }

    async getPaginatedCourses(query: QueryCourseDto): Promise<Course[]> {         
        const courses = await this.courseRepository
               .createQueryBuilder("course")            
               .leftJoin("course.ratings", "ratings")              
               .addGroupBy("course.id")
               .select("course.id", "id")
               .addSelect("course.description", "description")
               .addSelect("course.title", "title")
               .addSelect("course.img_url", "img_url")
               .addSelect("AVG(ratings.rating)", "rating") 
               .where("course.title like :title and course.difficulty like :difficulty", 
                { 
                    title:`%${query.title ? query.title : ""}%`, 
                    difficulty:`%${query.difficulty ? query.difficulty : ""}%` 
                })            
               .skip(50 * query.page)
               .take(query.limit)
               .getRawMany();        
        
        return courses;
    }

    async getCourseById (id: number): Promise<Course> {
        const course = await this.courseRepository
            .createQueryBuilder("course") 
            .where("course.id = :id", {id})          
            .leftJoin("course.ratings", "ratings")              
            .addGroupBy("course.id")
            .select("course.id", "id")
            .addSelect("course.description", "description")
            .addSelect("course.title", "title")
            .addSelect("course.img_url", "img_url")
            .addSelect("AVG(ratings.rating)", "rating")
            .getRawOne()

        return course;
    }
}