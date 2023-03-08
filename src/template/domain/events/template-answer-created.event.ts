import { DomainEventInterface } from '../../../core/domain';
import {
    Template,
    TemplateAnswer,
    TemplateElement,
    TemplateQuestion,
} from '../index';

export class TemplateAnswerCreatedEvent implements DomainEventInterface {
    public dateTimeOccurred: Date;

    constructor(
        public readonly template: Template,
        public readonly answer: TemplateAnswer,
        public readonly toQuestion: TemplateQuestion,
        public readonly toElement?: TemplateElement,
    ) {
        this.dateTimeOccurred = new Date();
    }

    public getAggregateId(): string {
        return this.template.id;
    }
}
