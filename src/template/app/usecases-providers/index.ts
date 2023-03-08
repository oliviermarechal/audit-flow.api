import { Provider } from '@nestjs/common';
import { ListTemplateUsecasesProvider } from './list-template-usecases.provider';
import { CreateTemplateUsecasesProvider } from './create-template-usecases.provider';

export const UsecasesProviders: Provider[] = [
    ListTemplateUsecasesProvider,
    CreateTemplateUsecasesProvider,
];
