import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { promisify } from 'util';
import { scrypt as _ascrypt, randomBytes } from 'crypto'
import { UserRepo } from 'src/user/user.repo';
const scrypt = promisify(_ascrypt);
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

    constructor(private configService:ConfigService, private userRepo: UserRepo,private userSvc:UserService,
        private jwtService:JwtService) {
    
    }

    async validPassword(hashPass:string,password:string){
        const [salt,storedHash]=hashPass.split('.');
        const hash=(await scrypt(password,salt,32))as Buffer;
        if(storedHash !==hash.toString('hex')){
            return false;
        }
        return true;

    }

    async validateUser(mobileNo: string,email:string, pass: string): Promise<any> {
        const user = await this.userRepo.fetchUser(mobileNo,email);
        console.log(user);  
        const result=await this.validPassword(user.password,pass);
        console.log('password=>',result,pass)
        if (user &&  result) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    async signUp(user:User){
        const newUser=await this.userSvc.add(user);
        console.log(newUser)
        if(!newUser){
            return new NotFoundException()
        }
       return await this.generateToken(newUser.userId);

    }

    async generateToken(userId:string){
        const [accessToken,refreshToken]=await Promise.all([
            
            this.jwtService.signAsync(
                {
                  sub: userId,
                userId:userId
                },
                {
                  secret: 'WwBW3LEuwFodloQs14Y83+u9N/F5AzWrdmoyCHQ9tEsz6iBQfh8HRUS+TwQ/cBhfJPCZPw8usVqP3llPxYEsM4yJjjnvvnWLG3MDBjieoONXXOBPxdXPpQOt2DSddICUn8TpCszqLTrgEvNUK9rvwk0arKtrVoVb+pWtlR7ojYUVAGcXOyOQvMRCLHl5zkURR1yKkasn+++mEFkjSuA61rNIDZ0dRdX2x6G8uRvnRZZAbXhp/Gqe9O+/vPObN1v2ZoLAMlrpJM9HCaejOhS/ENRATuXW3ILu0PkI+Wy5XmybGSw7u2yGuXtkfoSBUiDZjgRFMO5Um2fpTLFzjPCt/Q==',
                  expiresIn: '15m',
                },
              ),
              this.jwtService.signAsync(
                {
                  sub: userId,
                  userId:userId
               },
                {
                  secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                  expiresIn: '7d',
                },
              ),
        ]);

        return {
            accessToken,refreshToken
        }
    }

    async loginWithMobileNo(mobileNo: string, password: string) {
        const user=await this.userRepo.fetchUser(mobileNo);

        if(!user){
            return new NotFoundException('user not found');
        }
       const result=await this.validPassword(user.password,password);
        if(result){
          return await this.generateToken(user.userId);
        }else{
            return "invalid credentials"
        }
    
    }

    async loginWithEmail(email: string, password: string) {
        
         const user=await this.userRepo.fetchUser(email);
            if(!user){
                return new NotFoundException('user not found');
            }
           const result=this.validPassword(user.password,password);
            if(result){
                return await this.generateToken(user.userId);
            }else{
                return "invalid credentials"
            }
         // const [salt,storedHash]=(await user).password.split('.');
        // const hash=(await scrypt(password,salt,32))as Buffer;
        // if(storedHash !==hash.toString('hex')){
        //     throw new BadRequestException('bad exception')
        // }
        
        return user;
    }

    async signOut(){

    }

    async resetPassword(){

    }

    async sendOtp(){

    }

}
