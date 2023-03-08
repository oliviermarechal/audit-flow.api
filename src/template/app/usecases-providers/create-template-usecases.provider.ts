import {
    TemplateRepositoryInterface,
    VersionRepositoryInterface,
} from '../../domain';
import {
    CREATE_TEMPLATE_USECASES,
    CreateTemplateUsecases,
} from '../../usecases/command';

export const CreateTemplateUsecasesProvider = {
    inject: [TemplateRepositoryInterface, VersionRepositoryInterface],
    provide: CREATE_TEMPLATE_USECASES,
    useFactory: (
        templateRepository: TemplateRepositoryInterface,
        versionRepository: VersionRepositoryInterface,
    ) => {
        return new CreateTemplateUsecases(
            templateRepository,
            versionRepository,
        );
    },
};
