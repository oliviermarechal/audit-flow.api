import { AggregateRoot } from '../aggregate-root';
import { DomainEventInterface } from './domain-event.interface';

export class DomainEvents {
    private static handlersMap = {};
    private static markedAggregates: AggregateRoot<any>[] = [];

    /**
     * @method markAggregateForDispatch
     * @static
     * @desc Called by aggregate root objects that have created domain
     * events to eventually be dispatched when the infrastructure commits
     * the unit of work.
     */

    public static markAggregateForDispatch(
        aggregate: AggregateRoot<any>,
    ): void {
        const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }

    private static dispatchAggregateEvents(
        aggregate: AggregateRoot<any>,
    ): void {
        aggregate.domainEvents.forEach((event: DomainEventInterface) =>
            this.dispatch(event),
        );
    }

    private static removeAggregateFromMarkedDispatchList(
        aggregate: AggregateRoot<any>,
    ): void {
        const index = this.markedAggregates.findIndex((a) =>
            a.equals(aggregate),
        );
        this.markedAggregates.splice(index, 1);
    }

    private static findMarkedAggregateByID(id: string): AggregateRoot<any> {
        let found: AggregateRoot<any> = null;
        for (const aggregate of this.markedAggregates) {
            if (aggregate.id === id) {
                found = aggregate;
            }
        }

        return found;
    }

    public static dispatchEventsForAggregate(id: string): void {
        const aggregate = this.findMarkedAggregateByID(id);

        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }

    public static register(
        callback: (event: DomainEventInterface) => void,
        eventClassName: string,
    ): void {
        if (!this.handlersMap.hasOwnProperty(eventClassName)) {
            this.handlersMap[eventClassName] = [];
        }
        this.handlersMap[eventClassName].push(callback);
    }

    public static clearHandlers(): void {
        this.handlersMap = {};
    }

    public static clearMarkedAggregates(): void {
        this.markedAggregates = [];
    }

    private static dispatch(event: DomainEventInterface): void {
        const eventClassName: string = event.constructor.name;

        if (this.handlersMap.hasOwnProperty(eventClassName)) {
            const handlers: any[] = this.handlersMap[eventClassName];
            for (const handler of handlers) {
                handler(event);
            }
        }
    }
}
