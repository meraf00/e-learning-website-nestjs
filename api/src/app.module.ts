import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollement.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: "elearning.sqlite",
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    AuthModule,
    CourseModule,
    EnrollmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
