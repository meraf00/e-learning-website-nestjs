import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { Course } from "./models/course.entity";
import { User } from "../user/models/user.entity";
import { UserModule } from "../user/user.module";


@Module({
    imports: [
      TypeOrmModule.forFeature([Course, User]),  
      UserModule    
    ],
    providers: [CourseService],
    controllers: [CourseController],    
  })
  export class CourseModule {}
  