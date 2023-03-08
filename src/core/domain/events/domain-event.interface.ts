export interface DomainEventInterface {
    dateTimeOccurred: Date;
    getAggregateId(): string;
}
