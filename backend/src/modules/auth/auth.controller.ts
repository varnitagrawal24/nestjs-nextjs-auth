import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, createUserSchema } from '../user/dto/createUser.dto';
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  registerUser(@Body() createUserDto: CreateUserDto){
    return this.authService.register(createUserDto)
  }
}
