import { TemplateAnswer } from './template-answer';

export class TemplateQuestion {
    id: string;
    label: string;
    criteriaId: string;
    templateId?: string;
    elementId?: string;

    answersAvailable: TemplateAnswer[];

    addTemplateAnswer(answer: TemplateAnswer) {
        this.answersAvailable.push(answer);
    }

    removeTemplateAnswer(answer: TemplateAnswer) {
        this.answersAvailable = [
            ...this.answersAvailable.filter((a) => a.id !== answer.id),
        ];
    }
}
