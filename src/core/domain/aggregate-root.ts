import { Entity } from './entity';
import { DomainEventInterface, DomainEvents } from './events';

export abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents: DomainEventInterface[] = [];
    public id: string;

    public get domainEvents(): DomainEventInterface[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: DomainEventInterface): void {
        this._domainEvents.push(domainEvent);
        DomainEvents.markAggregateForDispatch(this);
        this.logDomainEventAdded(domainEvent);
    }

    public clearEvents(): void {
        this._domainEvents.splice(0, this._domainEvents.length);
    }

    private logDomainEventAdded(domainEvent: DomainEventInterface): void {
        const thisClass = Reflect.getPrototypeOf(this);
        const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        console.info(
            `[Domain Event Created]:`,
            thisClass.constructor.name,
            '==>',
            domainEventClass.constructor.name,
        );
    }
}
