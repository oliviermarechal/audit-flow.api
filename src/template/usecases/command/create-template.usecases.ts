import {
    Template,
    TemplateRepositoryInterface,
    VersionRepositoryInterface,
} from '../../domain';
import { Usecases } from '../../../core/domain';
import {
    TemplateCreationFailedException,
    VersionNotExistException,
} from '../../domain/exception';

export class CreateTemplateUsecases implements Usecases {
    constructor(
        private readonly templateRepository: TemplateRepositoryInterface,
        private readonly versionRepository: VersionRepositoryInterface,
    ) {}

    async execute(
        ownerId: string,
        versionId: string,
        name: string,
    ): Promise<Template> {
        const versionExist = await this.versionRepository.versionExist(
            versionId,
        );

        if (!versionExist) {
            throw VersionNotExistException.fromMessage(
                `Le template n'a pas pu être créer car la version ${versionId} n'existe pas`,
            );
        }

        const template = Template.create({
            ownerId,
            versionId,
            name,
        });

        if (typeof template === 'string') {
            throw TemplateCreationFailedException.fromMessage(template);
        }

        return this.templateRepository.create(template);
    }
}

export const CREATE_TEMPLATE_USECASES = Symbol('CreateTemplateUsecases');
