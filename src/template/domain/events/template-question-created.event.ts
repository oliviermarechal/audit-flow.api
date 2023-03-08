import { DomainEventInterface } from '../../../core/domain';
import { Template, TemplateElement, TemplateQuestion } from '../index';

export class TemplateQuestionCreatedEvent implements DomainEventInterface {
    public dateTimeOccurred: Date;

    constructor(
        public readonly template: Template,
        public readonly question: TemplateQuestion,
        public readonly toElement?: TemplateElement,
    ) {
        this.dateTimeOccurred = new Date();
    }

    public getAggregateId(): string {
        return this.template.id;
    }
}
