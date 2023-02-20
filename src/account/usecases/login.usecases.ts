import { Usecases } from '../../core/domain';
import { AccountRepositoryInterface } from '../domain/repository';
import { TokenServiceInterface } from '../domain/token';
import { EncrypterInterface } from '../domain/encrypter';
import { AuthenticationFailedError } from '../domain/exception';

export class LoginUsecases implements Usecases {
    constructor(
        private readonly accountRepository: AccountRepositoryInterface,
        private readonly encrypter: EncrypterInterface,
        private readonly tokenService: TokenServiceInterface,
    ) {}

    async execute(email: string, plainPassword: string) {
        const account = await this.accountRepository.findByEmail(email);
        if (!account) {
            throw new AuthenticationFailedError();
        }

        const isSame = await this.encrypter.compare(
            plainPassword,
            account.password,
        );

        if (!isSame) {
            throw new AuthenticationFailedError();
        }

        const { password, ...rest } = account;

        return {
            account: rest,
            token: await this.tokenService.sign({ userId: account.id }),
        };
    }
}

export const LOGIN_USECASES = 'LoginUsecases';
