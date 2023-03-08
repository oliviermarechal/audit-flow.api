import { DomainEventInterface } from '../../../core/domain';
import { Template, TemplateElement } from '../index';

export class TemplateElementCreatedEvent implements DomainEventInterface {
    public dateTimeOccurred: Date;

    constructor(
        public readonly template: Template,
        public readonly templateElement: TemplateElement,
    ) {
        this.dateTimeOccurred = new Date();
    }

    public getAggregateId(): string {
        return this.template.id;
    }
}
