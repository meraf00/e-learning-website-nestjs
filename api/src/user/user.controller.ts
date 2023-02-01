import { Body, Controller, Get, Param, Post, Res, HttpStatus, Put, Delete } from "@nestjs/common";
import { Response } from 'express';
import { CreateUserRequestDTO} from "./dto/create-user.dto";
import { UpdateUserRequestDTO } from "./dto/update-user.dto";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Post()
    public async createUser(@Body() user: CreateUserRequestDTO, @Res() response: Response) {
        try {
            const newUser = await this.userService.create(user);
            return response.status(HttpStatus.OK).send({id: newUser.id});

        } catch (e) {
            return response.status(HttpStatus.CONFLICT).send("User with similar email already exists.");
        }
    }

    @Get("/:userId")
    public async getUser(@Param('userId') userId: number, @Res() response: Response) {   
        const foundUser = await this.userService.getUserById(userId);

        if (foundUser) {
            const userDTO = new UserDTO();
            userDTO.email = foundUser.email;
            userDTO.firstname = foundUser.firstname;
            userDTO.lastname = foundUser.lastname;            

            return response.status(HttpStatus.OK).send(userDTO)
        }

        return response.status(HttpStatus.NOT_FOUND).send("User not found.")
    }  
    
    @Put(":userId")
    public async updateUser(@Param("userId") userId: string, @Body() userData: UpdateUserRequestDTO, @Res() response: Response) {
        try {            
            userData.id = parseInt(userId);            
            
            const updateStatus = await this.userService.update(userData);

            if (updateStatus == "NEW_USER_CREATED") {
                return response.status(HttpStatus.CREATED).send();
            }
            else {
                return response.status(HttpStatus.NO_CONTENT).send();
            }                    
        } catch (e) {            
            return response.status(HttpStatus.CONFLICT).send();
        }
    }

    @Delete(":userId")
    public async deleteUser(@Param("userId") userId: string, @Res() response: Response) {
        const id = parseInt(userId);

        if (await this.userService.getUserById(id)) {
            await this.userService.deleteUserById(id);
            return response.status(HttpStatus.NO_CONTENT).send();
        }
        else {
            return response.status(HttpStatus.NOT_FOUND).send("User not found.")
        }
    }

}