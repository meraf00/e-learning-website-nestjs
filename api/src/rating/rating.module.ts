import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rating } from "./models/rating.entity";
import { User } from "../user/models/user.entity";
import { UserModule } from "../user/user.module";
import { Course } from "src/course/models/course.entity";
import { RatingController } from "./rating.controller";
import { RatingService } from "./rating.service";


@Module({
    imports: [
      TypeOrmModule.forFeature([Course, Rating, User]),  
      UserModule    
    ],
    providers: [RatingService],
    controllers: [RatingController],    
  })
  export class RatingModule {}
  