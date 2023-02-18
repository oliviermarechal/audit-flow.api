import { DomainException } from '../domain-exception';

export class ForbiddenException extends DomainException {
    constructor() {
        super("Vous n'avez pas les droits pour cette action", 403);
    }
}
