import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      {
        type: 'sqlite',
        database: 'elearning.sqlite',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      }
    ),
    UserModule,
  ],
  providers: [],

})
export class AppModule {}