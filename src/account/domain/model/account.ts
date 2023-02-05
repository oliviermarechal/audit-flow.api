import { Entity } from '../../../core/domain';

export interface AccountProps {
    id?: string;
    email: string;
    password: string;
}

export class Account extends Entity<AccountProps> {
    id?: string;
    email: string;
    password: string;

    constructor(props: AccountProps) {
        super();
        this.id = props.id;
        this.email = props.email;
        this.password = props.password;
    }

    public static create(props: AccountProps) {
        if (!Account.validate(props)) {
            throw new Error('invalid entity'); // TODO Create domain exception
        }

        return new Account(props);
    }

    public static validate(props: AccountProps): boolean {
        return !!props.email && !!props.password;
    }

    public toExpose(): Partial<Account> {
        const { password, ...expose } = this;

        return expose;
    }
}
