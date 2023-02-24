import { DynamicModule, Module } from '@nestjs/common';
import { AppAdapters } from '../../core/app';

const Providers = [...AppAdapters];

@Module({
    imports: [],
    providers: [...Providers],
    controllers: [],
})
export class TemplateModule {
    static forRoot(): DynamicModule {
        return {
            module: TemplateModule,
            providers: [],
        };
    }
}
