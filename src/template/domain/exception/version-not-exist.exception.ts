import { DomainException } from '../../../core/domain';

export class VersionNotExistException extends DomainException {
    constructor(message: string) {
        super(message, 400);
    }

    public static fromMessage(message: string): VersionNotExistException {
        return new VersionNotExistException(message);
    }
}
