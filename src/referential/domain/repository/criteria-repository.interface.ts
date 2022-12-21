import { CriteriaInterface } from '../model';

export interface CriteriaRepositoryInterface {
    save(criteria: CriteriaInterface): Promise<CriteriaInterface>;
    findAll(): Promise<CriteriaInterface[]>;
}

export const CriteriaRepositoryInterface = Symbol(
    'CriteriaRepositoryInterface',
);
