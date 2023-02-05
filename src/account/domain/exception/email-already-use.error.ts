import { DomainException } from '../../../core/domain';

export class EmailAlreadyUseError extends DomainException {
    constructor() {
        super('Email already use', 400);
    }
}
