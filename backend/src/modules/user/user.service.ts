import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async findByEmail(email: string){
        const user = await this.userRepo.findOneBy({ email })
        return user;
    }

    async createUser(createUserDto: CreateUserDto){
        const { email, password, username } = createUserDto;

        const hashPassword = await hash(password);

        const newUser = this.userRepo.create({
            email,
            password: hashPassword,
            username
        })

        const createdUser = await this.userRepo.save(newUser);

        return {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email
        }
    }
}
