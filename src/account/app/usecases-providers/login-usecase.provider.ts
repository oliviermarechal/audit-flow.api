import { AccountRepositoryInterface } from '../../domain/repository';
import { EncrypterInterface } from '../../domain/encrypter';
import { LOGIN_USECASES, LoginUsecases } from '../../usecases';
import { TokenServiceInterface } from '../../domain/token';

export const LoginUsecaseProvider = {
    inject: [
        AccountRepositoryInterface,
        EncrypterInterface,
        TokenServiceInterface,
    ],
    provide: LOGIN_USECASES,
    useFactory: (
        accountRepository: AccountRepositoryInterface,
        encrypter: EncrypterInterface,
        tokenService: TokenServiceInterface,
    ) => {
        return new LoginUsecases(accountRepository, encrypter, tokenService);
    },
};
