import { Account } from '../../../src/account/domain/model';
import { AccountRepositoryInterface } from '../../../src/account/domain/repository';
import { AccountRepositoryMock, EncrypterMock } from './mock';
import { RegistrationUsecases } from '../../../src/account/usecases';
import { EncrypterInterface } from '../../../src/account/domain/encrypter';
import { DomainException } from '../../../src/core/domain';

describe('User Registration - Failed', () => {
    let ctx: Ctx;
    const email = 'o.marechal@icloud.com';
    const password = 'johndoe';

    beforeAll(() => {
        ctx = createCtx();
    });

    it('User registration [ERROR FLOW]', async () => {
        await ctx.givenSetExistingAccount(email, password);
        await ctx.whenISubmitRegistration(email, password);
        await ctx.ThenICanSeeAnError400BecauseEmailIsAlreadyUse();
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
    let error: DomainException;

    return {
        async givenSetExistingAccount(email: string, password: string) {
            await accountRepository.save(Account.create({ email, password }));
        },
        async whenISubmitRegistration(email: string, password: string) {
            try {
                await registrationUsecases.execute(email, password);
            } catch (e) {
                error = e;
            }
        },
        async ThenICanSeeAnError400BecauseEmailIsAlreadyUse() {
            expect(error.message).toBe('Email already use');
            expect(error.statusCode).toBe(400);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
