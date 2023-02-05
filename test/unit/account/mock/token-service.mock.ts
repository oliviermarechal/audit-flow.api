import { TokenServiceInterface } from '../../../../src/account/domain/token';

export class TokenServiceMock implements TokenServiceInterface {
    public static token = 'MOCKED_TOKEN';

    async sign(
        payload: string | Buffer | object,
        options?: { secret: string; expiresIn?: string | number },
    ): Promise<string> {
        return TokenServiceMock.token;
    }

    async verify(token: string, options?: { secret: string }) {
        return true;
    }

    decode(token: string): null | { [key: string]: any } | string {
        return JSON.parse(token);
    }
}
