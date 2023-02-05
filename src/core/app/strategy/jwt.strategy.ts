import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggedUserInterface } from '../../domain/interfaces/security';
import { AuthRepositoryInterface } from '../../domain/repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(AuthRepositoryInterface)
        private readonly authRepository: AuthRepositoryInterface,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET,
        });
    }

    async validate(payload: any): Promise<LoggedUserInterface> {
        const loggedUser = await this.authRepository.findUserById(payload.userId);

        if (loggedUser) {
            return loggedUser;
        }

        throw new UnauthorizedException();
    }
}
