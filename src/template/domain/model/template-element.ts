import { TemplateQuestion } from './template-question';

export class TemplateElement {
    id: string;
    name: string;
    templateId: string;
    questions: TemplateQuestion[];

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
