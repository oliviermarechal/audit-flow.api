import { TemplateElement, TemplateElementProps } from './template-element';
import { TemplateQuestion, TemplateQuestionProps } from './template-question';
import { AggregateRoot } from '../../../core/domain/aggregate-root';
import {
    TemplateElementCreatedEvent,
    TemplateQuestionCreatedEvent,
} from '../events';
import { Validator } from '../../../core/app/tools';
import { Version } from './version';

export interface TemplateProps {
    name: string;
    versionId: string;
    ownerId: string;
    elements?: TemplateElementProps[];
    questions?: TemplateQuestionProps[];
}

export class Template extends AggregateRoot<TemplateProps> {
    name: string;
    versionId: string;
    version?: Version;
    ownerId: string;

    elements: TemplateElement[] = [];
    questions: TemplateQuestion[] = [];

    constructor(props: TemplateProps, id?: string) {
        super();
        this.id = id;
        this.name = props.name;
        this.versionId = props.versionId;
        this.ownerId = props.ownerId;
        if (props.elements?.length > 0) {
            // this.elements = TemplateElement.create(props.elements);
        }
    }

    static create(props: TemplateProps): Template | string {
        const guardResult = Validator.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.versionId, argumentName: 'versionId' },
            { argument: props.ownerId, argumentName: 'ownerId' },
        ]);

        if (!guardResult.succeeded) {
            return guardResult.message;
        }

        return new Template(props);
    }

    addElement(element: TemplateElement) {
        this.addDomainEvent(new TemplateElementCreatedEvent(this, element));
        this.elements.push(element);
    }

    removeElement(element: TemplateElement) {
        this.elements = [...this.elements.filter((e) => e.id !== element.id)];
    }

    addQuestion(question: TemplateQuestion) {
        this.addDomainEvent(new TemplateQuestionCreatedEvent(this, question));
        this.questions.push(question);
    }

    removeQuestion(question: TemplateQuestion) {
        this.questions = [
            ...this.questions.filter((q) => q.id !== question.id),
        ];
    }

    addQuestionToElement(elementId: string, question: TemplateQuestion) {
        const element = this.elements.find((e) => e.id === elementId);
        this.addDomainEvent(
            new TemplateQuestionCreatedEvent(this, question, element),
        );

        element.addQuestion(question);
    }

    removeQuestionToElement(elementId: string, question: TemplateQuestion) {
        this.elements.find((e) => e.id === elementId).removeQuestion(question);
    }
}
