import { DynamicModule, Module } from '@nestjs/common';
import {
    CriteriaRepositoryInterface,
    DataMappingRepositoryInterface,
    ReferentialGatewayInterface,
    ReferentialRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../domain';
import {
    CriteriaRepository,
    DataMappingRepository,
    ReferentialController,
    ReferentialGateway,
    ReferentialRepository,
    ReferentialVersionRepository,
} from '../infrastructure';
import {
    ADD_VERSION_USECASES,
    AddReferentialVersionUsecases,
    CREATE_REFERENTIAL_USECASES,
    CreateReferentialUsecases,
    FETCH_REFERENTIAL_USECASES,
    FetchReferentialUsecases,
    LIST_REFERENTIAL_USECASES,
    ListReferentialUsecases,
    PUBLISH_VERSION_USECASES,
    PublishVersionUsecases,
    UPDATE_VERSION_USECASES,
    UpdateVersionUsecases,
} from '../usecases';
import { AppAdapters } from '../../core/app';

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
    controllers: [ReferentialController],
})
export class ReferentialModule {
    static forRoot(): DynamicModule {
        return {
            module: ReferentialModule,
            providers: [
                {
                    inject: [
                        CriteriaRepositoryInterface,
                        ReferentialRepositoryInterface,
                        ReferentialGatewayInterface,
                    ],
                    provide: FETCH_REFERENTIAL_USECASES,
                    useFactory: (
                        criteriaRepository: CriteriaRepositoryInterface,
                        referentialRepository: ReferentialRepositoryInterface,
                        referentialGateway: ReferentialGatewayInterface,
                    ) => {
                        return new FetchReferentialUsecases(
                            criteriaRepository,
                            referentialRepository,
                            referentialGateway,
                        );
                    },
                },
                {
                    inject: [ReferentialRepositoryInterface],
                    provide: CREATE_REFERENTIAL_USECASES,
                    useFactory: (
                        referentialRepository: ReferentialRepositoryInterface,
                    ) => {
                        return new CreateReferentialUsecases(
                            referentialRepository,
                        );
                    },
                },
                {
                    inject: [
                        ReferentialRepositoryInterface,
                        ReferentialVersionRepositoryInterface,
                    ],
                    provide: ADD_VERSION_USECASES,
                    useFactory: (
                        referentialRepository: ReferentialRepositoryInterface,
                        referentialVersionRepository: ReferentialVersionRepositoryInterface,
                    ) => {
                        return new AddReferentialVersionUsecases(
                            referentialRepository,
                            referentialVersionRepository,
                        );
                    },
                },
                {
                    inject: [ReferentialRepositoryInterface],
                    provide: LIST_REFERENTIAL_USECASES,
                    useFactory: (
                        referentialRepository: ReferentialRepositoryInterface,
                    ) => {
                        return new ListReferentialUsecases(
                            referentialRepository,
                        );
                    },
                },
                {
                    inject: [ReferentialVersionRepositoryInterface],
                    provide: PUBLISH_VERSION_USECASES,
                    useFactory: (
                        referentialVersionRepository: ReferentialVersionRepositoryInterface,
                    ) => {
                        return new PublishVersionUsecases(
                            referentialVersionRepository,
                        );
                    },
                },
                {
                    inject: [ReferentialVersionRepositoryInterface],
                    provide: UPDATE_VERSION_USECASES,
                    useFactory: (
                        referentialVersionRepository: ReferentialVersionRepositoryInterface,
                    ) => {
                        return new UpdateVersionUsecases(
                            referentialVersionRepository,
                        );
                    },
                },
            ],
        };
    }
}
