import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListCriteriaQuery } from './list-criteria.query';
import { Inject } from '@nestjs/common';
import { CriteriaRepositoryInterface } from '../../domain/repository';
import { CriteriaInterface } from '../../domain/model';

@QueryHandler(ListCriteriaQuery)
export class ListCriteriaHandler implements IQueryHandler<ListCriteriaQuery> {
    constructor(
        @Inject(CriteriaRepositoryInterface)
        private readonly criteriaRepository: CriteriaRepositoryInterface,
    ) {}

    async execute(query: ListCriteriaQuery): Promise<CriteriaInterface[]> {
        // return [
        //     {
        //         id: '1',
        //         externalId: 1,
        //         url: 'john doe',
        //         category: 'john doe',
        //         target: 'john doe',
        //         implement: 'john doe',
        //         control: 'john doe',
        //     },
        //     {
        //         id: '2',
        //         externalId: 2,
        //         url: 'john doe',
        //         category: 'john doe',
        //         target: 'john doe',
        //         implement: 'john doe',
        //         control: 'john doe',
        //     },
        // ];

        // TODO manage category filters
        return this.criteriaRepository.findAll();
    }
}
