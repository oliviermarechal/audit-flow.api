import { TokenServiceInterface } from '../../domain/token';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService implements TokenServiceInterface {
    constructor(private readonly jwtService: JwtService) {}

    async sign(
        payload: string | Buffer | object,
        options?: { secret: string; expiresIn?: string | number },
    ): Promise<string> {
        return this.jwtService.signAsync(payload, options);
    }

    async verify(token: string, options?: { secret: string }) {
        return this.jwtService.verifyAsync(token, options);
    }

    decode(token: string): null | { [key: string]: any } | string {
        return this.jwtService.decode(token);
    }
}
