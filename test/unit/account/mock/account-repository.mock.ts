import * as crypto from 'crypto';
import { AccountRepositoryInterface } from '../../../../src/account/domain/repository';
import { Account } from '../../../../src/account/domain/model';

export class AccountRepositoryMock implements AccountRepositoryInterface {
    private readonly accounts = new Map<string, Account>();

    async save(account: Account): Promise<Account> {
        account.id = crypto.randomBytes(16).toString('hex');

        this.accounts.set(account.id, account);

        return account;
    }

    async findByEmail(email: string): Promise<Account> {
        let account;

        this.accounts.forEach((a) => {
            if (a.email === email) {
                account = a;
            }
        });

        return account;
    }
}
