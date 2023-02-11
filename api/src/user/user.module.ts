import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Course } from '../course/models/course.entity';
import { Rating } from '../rating/models/rating.entity';
import { Enrollment } from '../enrollment/models/enrollement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Rating, Course, Enrollment]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController],  
})
export class UserModule {}
