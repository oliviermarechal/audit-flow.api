import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriteriaRepositoryInterface } from '../domain/repository';
import { ListCriteriaHandler } from './query';
import {
    CriteriaController,
    CriteriaEntity,
    CriteriaRepository,
} from '../infrastructure';
import { LIST_CRITERIA_USECASES, ListCriteriaUsecases } from '../usecases';
import { AppAdapters } from '../../app/app';
import { CqrsAdapterInterface } from '../../app/domain';

const Providers = [
    { provide: CriteriaRepositoryInterface, useClass: CriteriaRepository },
    ...AppAdapters,
];

const QueryHandlers = [ListCriteriaHandler];

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([CriteriaEntity])],
    providers: [...Providers, ...QueryHandlers],
    controllers: [CriteriaController],
})
export class ReferentialModule {
    static forRoot(): DynamicModule {
        return {
            module: ReferentialModule,
            providers: [
                {
                    inject: [CqrsAdapterInterface],
                    provide: LIST_CRITERIA_USECASES,
                    useFactory: (cqrsAdapter: CqrsAdapterInterface) => {
                        return new ListCriteriaUsecases(cqrsAdapter);
                    },
                },
            ],
        };
    }
}
