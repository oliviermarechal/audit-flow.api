import { Usecases } from '../../core/domain';
import { AccountRepositoryInterface } from '../domain/repository';
import { Account } from '../domain/model';
import { EncrypterInterface } from '../domain/encrypter';
import { EmailAlreadyUseError } from '../domain/exception';

export class RegistrationUsecases implements Usecases {
    constructor(
        private readonly accountRepository: AccountRepositoryInterface,
        private readonly encrypter: EncrypterInterface,
    ) {}

    async execute(email: string, password: string): Promise<Partial<Account>> {
        if (await this.accountRepository.findByEmail(email)) {
            throw new EmailAlreadyUseError();
        }

        const account = Account.create({ email, password });
        account.password = await this.encrypter.encrypt(account.password);
        await this.accountRepository.save(account);

        return account.toExpose();
    }
}

export const REGISTRATION_USECASES = 'RegistrationUsecases';
