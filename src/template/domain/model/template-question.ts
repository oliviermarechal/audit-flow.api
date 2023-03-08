import { TemplateAnswer, TemplateAnswerProps } from './template-answer';
import { Entity } from '../../../core/domain';

export interface TemplateQuestionProps {
    label: string;
    criteriaId: string;
    templateId?: string;
    elementId?: string;
    answersAvailable?: TemplateAnswerProps[];
}

export class TemplateQuestion extends Entity<TemplateQuestionProps> {
    label: string;
    criteriaId: string;
    templateId?: string;
    elementId?: string;
    answersAvailable: TemplateAnswer[];

    constructor(props: TemplateQuestionProps, id: string) {
        super();
        this.id = id;
        this.label = props.label;
        this.criteriaId = props.criteriaId;
        this.templateId = props.templateId;
        this.elementId = props.elementId;
        if (props.answersAvailable?.length > 0) {
            // this.answersAvailable = props.answersAvailable.map(a => TemplateAnswer.create(a));
        }
    }

    addTemplateAnswer(answer: TemplateAnswer) {
        this.answersAvailable.push(answer);
    }

    removeTemplateAnswer(answer: TemplateAnswer) {
        this.answersAvailable = [
            ...this.answersAvailable.filter((a) => a.id !== answer.id),
        ];
    }
}
