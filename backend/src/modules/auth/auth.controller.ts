import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';
import { SignUpDto, signUpSchema } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  registerUser(@Body() createUserDto: SignUpDto){
    return this.authService.register(createUserDto)
  }
}
