import { TemplateElement } from './template-element';
import { TemplateQuestion } from './template-question';

export class Template {
    id: string;
    name: string;
    versionId: string;

    elements: TemplateElement[];
    questions: TemplateQuestion[];

    addElement(element: TemplateElement) {
        // Todo check duplicate
        this.elements.push(element);
    }

    removeElement(element: TemplateElement) {
        this.elements = [...this.elements.filter((e) => e.id !== element.id)];
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

    addQuestionToElement(elementId: string, question: TemplateQuestion) {
        this.elements.find((e) => e.id === elementId).addQuestion(question);
    }

    removeQuestionToElement(elementId: string, question: TemplateQuestion) {
        this.elements.find((e) => e.id === elementId).removeQuestion(question);
    }
}
