import { Template } from '../model';

export interface TemplateRepositoryInterface {
    find(id: string): Promise<Template>;
    findByOwnerAndVersion(
        ownerId: string,
        versionId?: string,
    ): Promise<Template[]>;
    create(template: Template): Promise<Template>;
}

export const TemplateRepositoryInterface = Symbol(
    'TemplateRepositoryInterface',
);
