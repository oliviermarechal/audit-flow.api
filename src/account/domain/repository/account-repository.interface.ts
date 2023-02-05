import { Account } from '../model';

export interface AccountRepositoryInterface {
    save(account: Account): Promise<Account>;
    findByEmail(email: string): Promise<Account>;
}

export const AccountRepositoryInterface = Symbol('AccountRepositoryInterface');
