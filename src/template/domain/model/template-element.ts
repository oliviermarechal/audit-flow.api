import { TemplateQuestion, TemplateQuestionProps } from './template-question';
import { Entity } from '../../../core/domain';

export interface TemplateElementProps {
    name: string;
    templateId: string;
    questions?: TemplateQuestionProps[];
}

export class TemplateElement extends Entity<TemplateElementProps> {
    name: string;
    templateId: string;
    questions: TemplateQuestion[];

    constructor(props: TemplateElementProps, id?: string) {
        super();
        this.id = id;
        this.name = props.name;
        this.templateId = props.templateId;
        if (props.questions?.length > 0) {
            // this.questions = props.questions.map(q => TemplateQuestion.create(q));
        }
    }

    public static create(props): TemplateElement {
        // TODO validate props constraints
        return new TemplateElement(props);
    }

    addQuestion(question: TemplateQuestion) {
        // Todo check duplicate
        this.questions.push(question);
    }

    removeQuestion(question: TemplateQuestion) {
        this.questions = [
            ...this.questions.filter((q) => q.id !== question.id),
        ];
    }
}
