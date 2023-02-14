import { Controller,Post,Get,Body,Param,Session, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(LoginInterceptor)
  @Post('/signin')
  async signIn(@Body() body:LoginDTO){ 
      body.email?await this.authService.loginWithEmail(body.email,body.password):await this.authService.loginWithMobileNo(body.mobileNo,body.password);

  }

  @Post('/signup')
  signup(){

  }

  @Get()
  signOut(){

  }

  @Get('/currentuser')
  getCurrentUser(){
    
  }

}
