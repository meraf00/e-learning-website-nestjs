import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserRequestDTO } from "./dto/create-user.dto";
import { UpdateUserRequestDTO } from "./dto/update-user.dto";
import { UserDTO } from "./dto/user.dto";
import { User } from "./user.entity";


@Injectable()
export class UserService {
    constructor (@InjectRepository(User) private UserRepository: Repository<User>) {}

    async create(user: CreateUserRequestDTO): Promise<User> {    
        const newUser = new User();
        
        newUser.email = user.email;
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        newUser.password = user.password;

        return await this.UserRepository.save(newUser);        
    }

    async getUserById(userId: number): Promise<User> {                          
        return this.UserRepository.findOneBy({id: userId});
    }


    async update(userData: UpdateUserRequestDTO): Promise<string> { 
        const oldUser = await this.getUserById(userData.id);                        
        
        await this.UserRepository.save(userData);
        
        if (oldUser) {
            return "USER_DATA_UPDATED";
        }

        return "NEW_USER_CREATED";
    }

    async deleteUserById(userId: number) {
        await this.UserRepository.delete(userId);
    }

}