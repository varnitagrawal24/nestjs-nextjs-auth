import { Body, Controller, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';
import { SignUpDto, signUpSchema } from './dto/signup.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  registerUser(@Body() createUserDto: SignUpDto){
    return this.authService.register(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  logInUser(@Request() req){
    return req.user;
  }
}
