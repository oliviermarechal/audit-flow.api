export interface EncrypterInterface {
    encrypt(term: string): Promise<string>;
    compare(password: string, toCompare: string): Promise<boolean>;
}

export const EncrypterInterface = Symbol('EncrypterInterface');
