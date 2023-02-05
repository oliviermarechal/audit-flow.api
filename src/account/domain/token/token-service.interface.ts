export interface TokenServiceInterface {
    sign(
        payload: string | Buffer | object,
        options?: { secret: string; expiresIn?: string | number },
    ): Promise<string>;

    verify(token: string, options?: { secret: string });

    decode(token: string): null | { [key: string]: any } | string;
}

export const TokenServiceInterface = Symbol('TokenServiceInterface');
