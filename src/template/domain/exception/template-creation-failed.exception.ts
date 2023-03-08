import { DomainException } from '../../../core/domain';

export class TemplateCreationFailedException extends DomainException {
    constructor(message: string) {
        super(message, 400);
    }

    public static fromMessage(
        message: string,
    ): TemplateCreationFailedException {
        return new TemplateCreationFailedException(message);
    }
}
