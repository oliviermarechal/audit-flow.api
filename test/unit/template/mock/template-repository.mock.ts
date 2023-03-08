import {
    Template,
    TemplateRepositoryInterface,
} from '../../../../src/template/domain';
import * as crypto from 'crypto';

export class TemplateRepositoryMock implements TemplateRepositoryInterface {
    private templates = new Map<string, Template>();

    async find(id: string): Promise<Template> {
        return this.templates.get(id);
    }

    async create(template?: Template): Promise<Template> {
        if (!template) {
            return;
        }

        if (!template.id) {
            template.id = crypto.randomBytes(16).toString('hex');
        }

        this.templates.set(template.id, template);

        return template;
    }

    async findByOwnerAndVersion(
        ownerId: string,
        versionId: string,
    ): Promise<Template[]> {
        const templates: Template[] = [];
        this.templates.forEach((t) => {
            if (t.ownerId === ownerId && t.versionId === versionId) {
                templates.push(t);
            }
        });

        return templates;
    }
}
