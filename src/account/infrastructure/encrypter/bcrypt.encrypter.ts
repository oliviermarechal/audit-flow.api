import { EncrypterInterface } from '../../domain/encrypter';
import * as bcrypt from 'bcrypt';

export class BcryptEncrypter implements EncrypterInterface {
    async encrypt(term: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(term, salt);
    }

    async compare(password: string, toCompare: string): Promise<boolean> {
        return bcrypt.compare(password, toCompare);
    }
}
