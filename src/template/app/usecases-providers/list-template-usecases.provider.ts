import { TemplateRepositoryInterface } from '../../domain';
import {
    LIST_TEMPLATE_USECASES,
    ListTemplatesUsecases,
} from '../../usecases/query';

export const ListTemplateUsecasesProvider = {
    inject: [TemplateRepositoryInterface],
    provide: LIST_TEMPLATE_USECASES,
    useFactory: (templateRepository: TemplateRepositoryInterface) => {
        return new ListTemplatesUsecases(templateRepository);
    },
};
