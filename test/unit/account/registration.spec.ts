import { AccountRepositoryInterface } from '../../../src/account/domain/repository';
import { AccountRepositoryMock, EncrypterMock } from './mock';
import { RegistrationUsecases } from '../../../src/account/usecases';
import { EncrypterInterface } from '../../../src/account/domain/encrypter';
import { Account } from '../../../src/account/domain/model';

describe('User Registration', () => {
    let ctx: Ctx;
    const email = 'o.marechal@icloud.com';
    const password = 'johndoe';

    beforeAll(() => {
        ctx = createCtx();
    });

    it('User registration [HAPPY FLOW]', async () => {
        await ctx.whenISubmitRegistration(email, password);
        await ctx.thenICanFindUserWithEmail(email);
    });
});

const createCtx = () => {
    const accountRepository: AccountRepositoryInterface =
        new AccountRepositoryMock();
    const encrypter: EncrypterInterface = new EncrypterMock();
    const registrationUsecases = new RegistrationUsecases(
        accountRepository,
        encrypter,
    );

    return {
        async whenISubmitRegistration(
            email: string,
            password: string,
        ): Promise<Partial<Account>> {
            return registrationUsecases.execute(email, password);
        },
        async thenICanFindUserWithEmail(email: string) {
            return accountRepository.findByEmail(email);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
