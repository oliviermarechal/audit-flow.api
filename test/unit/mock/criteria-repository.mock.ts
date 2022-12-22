import { CriteriaRepositoryInterface } from '../../../src/referential/domain/repository';
import { CriteriaInterface } from '../../../src/referential/domain/model';

export class CriteriaRepositoryMock implements CriteriaRepositoryInterface {
    async save(criteria: CriteriaInterface): Promise<CriteriaInterface> {
        return criteria;
    }

    /**
     * Return empty array, use mock inside test for return values
     */
    async findAll(): Promise<CriteriaInterface[]> {
        return [];
    }
}
