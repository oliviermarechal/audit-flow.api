import { AccountRepositoryInterface } from '../../domain/repository';
import { EncrypterInterface } from '../../domain/encrypter';
import { REGISTRATION_USECASES, RegistrationUsecases } from '../../usecases';

export const RegistrationUsecaseProvider = {
    inject: [AccountRepositoryInterface, EncrypterInterface],
    provide: REGISTRATION_USECASES,
    useFactory: (
        accountRepository: AccountRepositoryInterface,
        encrypter: EncrypterInterface,
    ) => {
        return new RegistrationUsecases(accountRepository, encrypter);
    },
};
