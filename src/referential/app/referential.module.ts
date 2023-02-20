import { DynamicModule, Module } from '@nestjs/common';
import {
    CriteriaRepositoryInterface,
    DataMappingRepositoryInterface,
    ReferentialGatewayInterface,
    ReferentialRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../domain';
import {
    CriteriaController,
    CriteriaRepository,
    DataMappingRepository,
    ReferentialController,
    ReferentialGateway,
    ReferentialRepository,
    ReferentialVersionRepository,
} from '../infrastructure';
import { AppAdapters } from '../../core/app';
import { UsecasesProviders } from './usecases-providers';

const Providers = [
    { provide: CriteriaRepositoryInterface, useClass: CriteriaRepository },
    {
        provide: ReferentialRepositoryInterface,
        useClass: ReferentialRepository,
    },
    {
        provide: ReferentialVersionRepositoryInterface,
        useClass: ReferentialVersionRepository,
    },
    {
        provide: DataMappingRepositoryInterface,
        useClass: DataMappingRepository,
    },
    { provide: ReferentialGatewayInterface, useClass: ReferentialGateway },
    ...AppAdapters,
];

@Module({
    imports: [],
    providers: [...Providers],
    controllers: [ReferentialController, CriteriaController],
})
export class ReferentialModule {
    static forRoot(): DynamicModule {
        return {
            module: ReferentialModule,
            providers: [...UsecasesProviders],
        };
    }
}
