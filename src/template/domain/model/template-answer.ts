import { Entity } from '../../../core/domain';

export interface TemplateAnswerProps {
    questionId: string;
    label: string;
}

export class TemplateAnswer extends Entity<TemplateAnswerProps> {
    questionId: string;
    label: string;

    constructor(props: TemplateAnswerProps, id?: string) {
        super();
        this.id = id;
        this.questionId = props.questionId;
        this.label = props.label;
    }

    public static create(props: TemplateAnswerProps): TemplateAnswer {
        // TODO Validation
        return new TemplateAnswer(props);
    }
}
