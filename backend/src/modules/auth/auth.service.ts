import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async register(createUserDto: SignUpDto){
        const user = await this.userService.findByEmail(createUserDto.email);
        if(user) throw new ConflictException('This Email is already exists!');
        return this.userService.createUser(createUserDto);
    }
}
