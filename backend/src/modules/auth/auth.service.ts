import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async register(createUserDto: CreateUserDto){
        const user = await this.userService.findByEmail(createUserDto.email);
        if(user) throw new ConflictException('This Email is already exists!');
        return this.userService.createUser(createUserDto);
    }
}
