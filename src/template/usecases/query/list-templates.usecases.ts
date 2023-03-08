import { Usecases } from '../../../core/domain';
import { Template, TemplateRepositoryInterface } from '../../domain';

export class ListTemplatesUsecases implements Usecases {
    constructor(
        public readonly templateRepository: TemplateRepositoryInterface,
    ) {}

    async execute(ownerId: string, versionId?: string): Promise<Template[]> {
        return this.templateRepository.findByOwnerAndVersion(
            ownerId,
            versionId,
        );
    }
}

export const LIST_TEMPLATE_USECASES = Symbol('ListTemplatesUsecases');
