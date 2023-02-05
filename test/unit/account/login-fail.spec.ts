import { Account } from '../../../src/account/domain/model';
import { AccountRepositoryInterface } from '../../../src/account/domain/repository';
import { EncrypterInterface } from '../../../src/account/domain/encrypter';
import { TokenServiceInterface } from '../../../src/account/domain/token';
import { LoginUsecases } from '../../../src/account/usecases/login.usecases';
import { AccountRepositoryMock, EncrypterMock, TokenServiceMock } from './mock';
import { DomainException } from '../../../src/core/domain';

describe('User failed login', () => {
    let ctx: Ctx;
    const email = 'o.marechal@icloud.com';
    const password = 'johndoe';

    beforeAll(() => {
        ctx = createCtx();
        ctx.givenSetExistingAccount(email, password);
    });

    it('User login [ERROR FLOW]', async () => {
        await ctx.whenISubmitLogin(email, 'BAD_PASSWORD');
        await ctx.thenTheRequestHasFailed();
    });
});

const createCtx = () => {
    const accountRepository: AccountRepositoryInterface =
        new AccountRepositoryMock();
    const tokenService: TokenServiceInterface = new TokenServiceMock();
    const encrypter: EncrypterInterface = new EncrypterMock();
    const loginUsecases = new LoginUsecases(
        accountRepository,
        encrypter,
        tokenService,
    );
    let error: DomainException;

    return {
        async givenSetExistingAccount(email: string, password: string) {
            await accountRepository.save(Account.create({ email, password }));
        },
        async whenISubmitLogin(email: string, password: string) {
            try {
                await loginUsecases.execute(email, password);
            } catch (e) {
                error = e;
            }
        },
        async thenTheRequestHasFailed() {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe('Authentication failed');
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
