import { Controller, Post, Get, Body, Param, Session, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginInterceptor } from './login.interceptor';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseInterceptors(LoginInterceptor)
  @Post('/signin')
  async signIn(@Body() body: LoginDTO) {
    return body.email ? await this.authService.loginWithEmail(body.email, body.password) : await this.authService.loginWithMobileNo(body.mobileNo, body.password);

  }

  @Post('/signup')
  async signup(@Body() user: CreateUserDTO) {
    let userEntity: User = {
      createdOn: Date.now(),
      email: user.email,
      enabled: true,
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNo: user.mobileNo,
      userType: user.userType,
      password: user.password,

    }
    return await this.authService.signUp(userEntity);
  }

  @Get()
  signOut() {

  }

  @Get('/currentuser')
  getCurrentUser() {

  }

  @Post('validate')
  async validate(@Body() body: LoginDTO) {
    return await this.authService.validateUser(body.mobileNo, body.email, body.password)
  }
}
