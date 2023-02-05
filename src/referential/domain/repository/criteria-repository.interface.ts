import { Criteria } from '../model';

export interface CriteriaRepositoryInterface {
    save(criteria: Criteria): Promise<Criteria>;
    findAll(): Promise<Criteria[]>;
}

export const CriteriaRepositoryInterface = Symbol(
    'CriteriaRepositoryInterface',
);
