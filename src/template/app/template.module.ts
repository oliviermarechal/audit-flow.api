import { DynamicModule, Module } from '@nestjs/common';
import { AppAdapters } from '../../core/app';
import {
    TemplateRepositoryInterface,
    VersionRepositoryInterface,
} from '../domain';
import {
    TemplateRepository,
    VersionRepository,
} from '../infrastructure/repository';
import { UsecasesProviders } from './usecases-providers';
import { TemplateController } from '../infrastructure/controller';

const Providers = [
    {
        provide: TemplateRepositoryInterface,
        useClass: TemplateRepository,
    },
    {
        provide: VersionRepositoryInterface,
        useClass: VersionRepository,
    },
    ...AppAdapters,
];

@Module({
    imports: [],
    providers: [...Providers],
    controllers: [TemplateController],
})
export class TemplateModule {
    static forRoot(): DynamicModule {
        return {
            module: TemplateModule,
            providers: [...UsecasesProviders],
        };
    }
}
