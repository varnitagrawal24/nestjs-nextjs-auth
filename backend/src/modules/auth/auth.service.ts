import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signup.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async register(createUserDto: SignUpDto){
        const user = await this.userService.findByEmail(createUserDto.email);
        if(user) throw new ConflictException('This Email is already exists!');
        return this.userService.createUser(createUserDto);
    }

    async validateLocalUser(email: string, password: string){
        const user = await this.userService.findByEmail(email);

        if (!user) throw new UnauthorizedException('Email is not register!');

        const isPasswordMatched = await verify(user.password, password)

        if (!isPasswordMatched) throw new UnauthorizedException('Invalid password!');

        return { id: user.id, username: user.username, email: user.email };

    }
}
