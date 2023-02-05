import { EncrypterInterface } from '../../../../src/account/domain/encrypter';

export class EncrypterMock implements EncrypterInterface {
    async encrypt(term: string): Promise<string> {
        return term;
    }

    async compare(password: string, toCompare: string): Promise<boolean> {
        return password === toCompare;
    }
}
