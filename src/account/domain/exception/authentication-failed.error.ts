import { DomainException } from '../../../core/domain';

export class AuthenticationFailedError extends DomainException {
    constructor() {
        super('Authentication failed', 401);
    }
}
