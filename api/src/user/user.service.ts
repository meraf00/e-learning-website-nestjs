import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/dto/CreateUser.dto';
import { LoginUserDto } from './models/dto/LoginUser.dto';
import { UserEntity } from './models/user.entity';
import { UserI } from './models/user.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService
  ) { }

  create(createdUserDto: CreateUserDto): Observable<UserI> {
    const userEntity = this.userRepository.create(createdUserDto);

    return this.mailExists(userEntity.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(userEntity.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              userEntity.password = passwordHash;
              return from(this.userRepository.save(userEntity)).pipe(
                map((savedUser: UserI) => {
                  const { password, ...user } = savedUser;
                  return user;
                })
              )
            })
          )
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      })
    )
  }

  login(loginUserDto: LoginUserDto): Observable<string> {
    return this.findUserByEmail(loginUserDto.email.toLowerCase()).pipe(
      switchMap((user: UserI) => {
        if (user) {
          return this.validatePassword(loginUserDto.password, user.password).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.findOne(user.id).pipe(
                  switchMap((user: UserI) => this.authService.generateJwt(user))
                )
              } else {
                throw new HttpException('Login was not Successfulll', HttpStatus.UNAUTHORIZED);
              }
            })
          )
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }
      )
    )
  }

  findAll(): Observable<UserI[]> {
    return from(this.userRepository.find());
  }

  findOne(id: number): Observable<UserI> {
    return from(this.userRepository.findOne({ id }));
  }

  findUserByEmail(email: string): Observable<UserI> {
    return from(this.userRepository.findOne({ email }, { select: ['id', 'email', 'name', 'password'] }));
  }

  private validatePassword(password: string, storedPasswordHash: string): Observable<boolean> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  private mailExists(email: string): Observable<boolean> {
    email = email.toLowerCase();
    return from(this.userRepository.findOne({ email })).pipe(
      map((user: UserI) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    )
  }

  async getUserById(userId: number): Promise<UserI> {                          
    return await this.userRepository.findOne({id: userId});
}

async getUserByEmail(userEmail: string): Promise<UserI> {                          
    return await this.userRepository.findOne({email: userEmail});
}

async update(userData: any): Promise<string> { 
    const oldUser = await this.getUserById(userData.id);                        
    
    await this.userRepository.save(userData);
    
    if (oldUser) {
        return "USER_DATA_UPDATED";
    }

    return "NEW_USER_CREATED";
}

async deleteUserById(userId: number) {
    await this.userRepository.delete(userId);
}



}
