import { Account } from '../../../src/account/domain/model';
import { AccountRepositoryInterface } from '../../../src/account/domain/repository';
import { EncrypterInterface } from '../../../src/account/domain/encrypter';
import { TokenServiceInterface } from '../../../src/account/domain/token';
import { LoginUsecases } from '../../../src/account/usecases';
import { AccountRepositoryMock, EncrypterMock, TokenServiceMock } from './mock';

describe('User login', () => {
    let ctx: Ctx;
    const email = 'o.marechal@icloud.com';
    const password = 'johndoe';

    beforeAll(() => {
        ctx = createCtx();
        ctx.givenSetExistingAccount(email, password);
    });

    it('User login [HAPPY FLOW]', async () => {
        await ctx.whenISubmitLogin(email, password);
        await ctx.thenICanFindATokenInResponse(email, TokenServiceMock.token);
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
    let usecasesResponse;

    return {
        async givenSetExistingAccount(email: string, password: string) {
            await accountRepository.save(Account.create({ email, password }));
        },
        async whenISubmitLogin(email: string, password: string) {
            usecasesResponse = await loginUsecases.execute(email, password);
        },
        async thenICanFindATokenInResponse(email: string, token: string) {
            expect(usecasesResponse.token).not.toBeNull();
            expect(usecasesResponse.token).toBe(token);
            expect(usecasesResponse.account.email).toBe(email);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
