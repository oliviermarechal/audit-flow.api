import { IQuery } from '@nestjs/cqrs';

export class ListCriteriaQuery implements IQuery {
    constructor(public readonly category?: string) {}
}
