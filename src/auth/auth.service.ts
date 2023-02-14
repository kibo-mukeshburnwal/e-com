import { BadRequestException, Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { scrypt as _ascrypt, randomBytes } from 'crypto'
import { Neo4jService } from 'nest-neo4j/dist';
import { UserRepo } from 'src/user/user.repo';
const scrypt = promisify(_ascrypt);


@Injectable()
export class AuthService {

    constructor(private userRepo: UserRepo) {
    
    }


    async loginWithMobileNo(mobileNo: string, password: string) {
        const user=await this.userRepo.fetchUser(mobileNo,password);
        const [salt,storedHash]=user.password.split('.');
        const hash=(await scrypt(password,salt,32))as Buffer;


        if(storedHash !==hash.toString('hex')){
            throw new BadRequestException('bad exception')
        }
        
        return user;

    }

    async loginWithEmail(email: string, password: string) {
        
        const user=this.userRepo.fetchUser(email,password);
        const [salt,storedHash]=(await user).password.split('.');
        const hash=(await scrypt(password,salt,32))as Buffer;
        if(storedHash !==hash.toString('hex')){
            throw new BadRequestException('bad exception')
        }
        
        return user;
    }


}
